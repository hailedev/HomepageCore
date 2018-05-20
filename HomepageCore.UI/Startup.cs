using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using HomepageCore.Data;
using HomepageCore.Data.Repositories;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.Data.Entities;
using HomepageCore.Data.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using NLog.Web;
using NLog;
using NLog.Config;
using Microsoft.AspNetCore.Http;
using NLog.Extensions.Logging;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using HomepageCore.UI.Configuration;
using Microsoft.AspNetCore.Authentication.Google;
using NSwag.AspNetCore;
using HomepageCore.Services.Interfaces;
using HomepageCore.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using IdentityServer4.AccessTokenValidation;
using HomepageCore.UI.Services.Interfaces;
using HomepageCore.UI.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.HttpOverrides;

namespace HomepageCore.UI
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets<Startup>();
            }
            
            Configuration = builder.Build();

            // set nlog config
            env.ConfigureNLog("nlog.config");
            LogManager.Configuration.Variables["connectionString"] = Configuration.GetConnectionString("DefaultConnection");
            LogManager.Configuration.Install(new InstallationContext());

            Environment = env;
        }

        public IConfigurationRoot Configuration { get; }
        public IHostingEnvironment Environment { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>(optionsBuilder => optionsBuilder.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddSingleton<IHostingEnvironment>(Environment);

            services.AddOptions();
            services.Configure<ApplicationOptions>(Configuration);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<Func<IServiceClient>>(provider => new Func<IServiceClient>(() => new ServiceClient(provider.GetService<IHttpContextAccessor>(), provider.GetService<IOptions<ApplicationOptions>>())));

            services.AddAuthentication(options => {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
            .AddCookie()
            .AddOpenIdConnect(options => {
                options.Authority = Configuration["OpenIdConnect:Authority"];
                options.ClientId = Configuration["OpenIdConnect:ClientId"];
                options.ResponseType = "code id_token";
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("api1");
                options.SaveTokens = true;
                options.RequireHttpsMetadata = false;
                options.ClientSecret = Configuration["OpenIdConnect:ClientSecret"];
                options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.GetClaimsFromUserInfoEndpoint = true;
            })
            .AddIdentityServerAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme, options => { // JWT authentication
                options.Authority = Configuration["OpenIdConnect:Authority"];
                options.ApiName = "api1";
                options.RequireHttpsMetadata = false;
            });

            // Add compression
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Fastest);
            services.AddResponseCompression(options =>
            {
                options.Providers.Add<GzipCompressionProvider>();
                options.EnableForHttps = true;
            });
            
            // Add framework services.
            services.AddMvc();

            // Add automapper
            services.AddAutoMapper(x => x.CreateMissingTypeMaps = true);

            // needed for NLog
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Add api versioning
            services.AddApiVersioning(x =>
            {
                x.AssumeDefaultVersionWhenUnspecified = true;
                x.DefaultApiVersion = new ApiVersion(1, 0);
                x.ApiVersionReader = new HeaderApiVersionReader("version");
                x.ReportApiVersions = true;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddNLog();
            app.AddNLogWeb();

            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                context.Database.Migrate();

                if (env.IsDevelopment())
                {
                    app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                        HotModuleReplacement = true,
                        ReactHotModuleReplacement = true,
                        ConfigFile = Configuration["WebpackConfig"]
                    });
                    app.UseDeveloperExceptionPage();
                    if(context.Posts.Count() <= 0)
                    {
                        var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                        context.EnsureSeedData(userManager);
                    }
                }
            }

            app.UseResponseCompression();

            if (!env.IsDevelopment())
            {
                var forwardingOptions = new ForwardedHeadersOptions()
                {
                    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
                };
                forwardingOptions.KnownNetworks.Clear();
                forwardingOptions.KnownProxies.Clear();
                app.UseForwardedHeaders(forwardingOptions);
            }

            app.UseAuthentication();

            app.UseFileServer();

            app.UseSwaggerUi(typeof(Startup).Assembly, new SwaggerUiSettings());

            app.UseMvc(routes =>
            {
                routes.MapRoute("default","{controller}/{action=Index}/{id?}");
                routes.MapSpaFallbackRoute("spa-fallback",new { Controller = "Home", action = "Index"});
            });
        }
    }
}
