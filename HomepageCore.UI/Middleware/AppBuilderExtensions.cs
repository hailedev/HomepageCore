using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

namespace HomepageCore.Middleware
{
    public static class AppBuilderExtensions
    {
        public static IApplicationBuilder UseCustomRoute(this IApplicationBuilder app, IConfiguration configuration)
        {
            return app.UseMiddleware(typeof(CustomRouteMiddleware), configuration);
        }
    }
}
