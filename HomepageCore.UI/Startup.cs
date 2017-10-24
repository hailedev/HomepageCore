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
using HomepageCore.Middleware;
using Microsoft.AspNetCore.ResponseCompression;
using System.IO.Compression;

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
            Configuration = builder.Build();

            // set nlog config
            env.ConfigureNLog("nlog.config");
            LogManager.Configuration.Variables["connectionString"] = "Data Source=HomepageCore.db";//Configuration.GetConnectionString("DefaultConnection");
            LogManager.Configuration.Install(new InstallationContext());
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ApplicationDbContext>();
            services.AddScoped<PostRepository>();
            services.AddScoped<CategoryRepository>();
            services.AddScoped<IApplicationUnitOfWork, ApplicationUnitOfWork>();

            services.AddIdentity<ApplicationUser, IdentityRole>(
                config =>
                {
                    config.User.RequireUniqueEmail = true;
                })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.ConfigureApplicationCookie(
                config => config.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        ctx.Response.StatusCode = 400;
                        return Task.FromResult<object>(null);
                    }
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

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();
                    if(context.Posts.Count() <= 0)
                    {
                        var userManager = serviceScope.ServiceProvider.GetService<UserManager<ApplicationUser>>();
                        context.EnsureSeedData(userManager);
                    }
                }
            }

            app.UseResponseCompression();
            app.UseAuthentication();
            app.UseCustomRoute(Configuration);
            app.UseFileServer();

            app.UseMvc();
        }
    }
}
