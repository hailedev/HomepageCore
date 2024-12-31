// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using AutoMapper;
using AutoMapper.Configuration;
using HarmonyLib;
using IdentityServer4.EntityFramework.DbContexts;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;
using System.Reflection;

namespace HomepageCore.Identity
{
    public class Program
    {
        public static void Main(string[] args)
        {
            PatchAutomapper();
            var host = BuildWebHost(args);

            using (var scope = host.Services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                scope.ServiceProvider.GetService<PersistedGrantDbContext>().Database.Migrate();
                scope.ServiceProvider.GetService<ConfigurationDbContext>().Database.Migrate();
            }

            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
                .MinimumLevel.Override("System", LogEventLevel.Warning)
                .MinimumLevel.Override("Microsoft.AspNetCore.Authentication", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.File(@"identityserver4_log.txt")
                .WriteTo.Console(outputTemplate: "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message:lj}{NewLine}{Exception}{NewLine}", theme: AnsiConsoleTheme.Literate)
                .CreateLogger();

            return WebHost.CreateDefaultBuilder(args)
                    .UseStartup<Startup>()
                    .ConfigureLogging(builder =>
                    {
                        builder.ClearProviders();
                        builder.AddSerilog();
                    })
                    .Build();
        }

        public static void PatchAutomapper()
        {
            var harmony = new Harmony("homepagecore.identity");

            var originalMethod = typeof(MapperConfiguration).GetMethod("Build", BindingFlags.Static | BindingFlags.NonPublic);
            var postFix = typeof(Program).GetMethod(nameof(BuildPostfix), BindingFlags.Static | BindingFlags.Public);

            if (originalMethod != null && postFix != null)
            {
                harmony.Patch(originalMethod, postfix: new HarmonyMethod(postFix));
            }
        }

        public static void BuildPostfix(ref MapperConfigurationExpression __result) => __result.ShouldMapMethod = cfg => false;
    }
}
