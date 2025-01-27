using System;
using System.Linq;
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
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using NLog.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;
using HomepageCore.UI.Configuration;
using HomepageCore.Services.Interfaces;
using HomepageCore.Services;
using Microsoft.EntityFrameworkCore;
using HomepageCore.UI.Services.Interfaces;
using HomepageCore.UI.Services;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.Hosting;
using HomepageCore.UI.Models;
using NLog;
using NLog.Config;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using System.Threading.Tasks;

namespace HomepageCore.UI
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
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

            LogManager.Configuration.Variables["connectionString"] = Configuration.GetConnectionString("DefaultConnection");
            LogManager.Configuration.Install(new InstallationContext());

            Environment = env;
        }

        public IConfigurationRoot Configuration { get; }
        public IWebHostEnvironment Environment { get; }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging(loggingBuilder => {
                loggingBuilder.ClearProviders();
                loggingBuilder.AddNLogWeb("nlog.config");
                loggingBuilder.AddConsole();
            });
            services.AddDbContext<ApplicationDbContext>(optionsBuilder => optionsBuilder.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            services.AddScoped<IPostRepository, PostRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();
            services.AddScoped<IEmailSender, EmailSender>();
            services.AddSingleton<IWebHostEnvironment>(Environment);

            services.AddOptions();
            services.Configure<ApplicationOptions>(Configuration);
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<Func<IServiceClient>>(provider => new Func<IServiceClient>(() => new ServiceClient(provider.GetService<IHttpContextAccessor>(), provider.GetService<IOptions<ApplicationOptions>>())));

            services.AddAuthentication()
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, options => {
                    options.ForwardChallenge = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddOpenIdConnect(OpenIdConnectDefaults.AuthenticationScheme, options => {
                    options.Authority = Configuration["OpenIdConnect:Authority"];
                    options.ClientId = Configuration["OpenIdConnect:ClientId"];
                    options.ResponseType = "code";
                    options.Scope.Add("openid");
                    options.Scope.Add("profile");
                    options.Scope.Add("api1");
                    options.SaveTokens = true;
                    options.RequireHttpsMetadata = false;
                    options.ClientSecret = Configuration["OpenIdConnect:ClientSecret"];
                    options.SignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    options.GetClaimsFromUserInfoEndpoint = true;
                    options.UsePkce = true;
                    options.Events.OnRedirectToIdentityProvider = async context => {
                        context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.Replace(Configuration["OpenIdConnect:Authority"], Configuration["OpenIdConnect:ValidIssuer"]);
                        await Task.FromResult(0);
                    };
                    options.Events.OnUserInformationReceived = async context => {
                        //context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.Replace(Configuration["OpenIdConnect:Authority"], Configuration["OpenIdConnect:ValidIssuer"]);
                        await Task.FromResult(0);
                    };
                    options.Events.OnRedirectToIdentityProvider = async context => {
                        context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.Replace(Configuration["OpenIdConnect:Authority"], Configuration["OpenIdConnect:ValidIssuer"]);
                        await Task.FromResult(0);
                    };
                    options.Events.OnTokenResponseReceived = async context => {
                        //context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.Replace(Configuration["OpenIdConnect:Authority"], Configuration["OpenIdConnect:ValidIssuer"]);
                        await Task.FromResult(0);
                    };
                    options.Events.OnRedirectToIdentityProviderForSignOut = async context => {
                        //throw new Exception(context.ProtocolMessage.IdTokenHint);
                        context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.Replace(Configuration["OpenIdConnect:Authority"], Configuration["OpenIdConnect:ValidIssuer"]);
                        context.ProtocolMessage.PostLogoutRedirectUri = Configuration["OpenIdConnect:PostLogoutRedirectUri"];
                        await Task.FromResult(0);
                    };
                })
                .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options => {
                    options.Authority = Configuration["OpenIdConnect:Authority"];
                    options.Audience = "api1";
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters.ValidIssuer = Configuration["OpenIdConnect:ValidIssuer"];
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
            services.AddAutoMapper(x => x.AddProfile<DefaultMappingProfile>());

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

            services.AddOpenApiDocument();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                context.Database.Migrate();

                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                    if(!context.Posts.Any())
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

            app.UseFileServer();

            app.UseOpenApi();
            app.UseSwaggerUi();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endPoints => endPoints.MapControllers());

            app.UseSpa(builder => 
            {
                builder.Options.SourcePath = "/";
                builder.Options.DefaultPage = "/index.html";

                if (env.IsDevelopment() && bool.TryParse(Configuration["HotReload"], out bool result) && result)
                {
                    builder.UseProxyToSpaDevelopmentServer(Configuration["DevServer"]);
                }
            });
        }
    }
}
