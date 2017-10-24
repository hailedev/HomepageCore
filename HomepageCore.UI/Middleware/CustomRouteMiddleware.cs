using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace HomepageCore.Middleware
{
    public class CustomRouteMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public CustomRouteMiddleware(RequestDelegate next, IConfiguration configuration)
        {
            _next = next;
            _configuration = configuration;
        }

        public async Task Invoke(HttpContext context)
        {
            if (!context.Request.Path.StartsWithSegments("/api") &&
                !context.Request.Path.StartsWithSegments("/signin-google") &&
                !context.Request.Path.StartsWithSegments("/resume") &&
                !context.Request.Path.StartsWithSegments("/js") &&
                !context.Request.Path.StartsWithSegments("/css") &&
                !context.Request.Path.StartsWithSegments("/fonts") &&
                !context.Request.Path.StartsWithSegments("/images") &&
                !context.Request.Path.StartsWithSegments("/favicon.ico") &&
                !context.Request.Path.StartsWithSegments("/downloads") &&
                !context.Request.Path.StartsWithSegments(_configuration["appRoute"]))
            {
                context.Request.Path = "/";
            }

            await _next(context);
        }
    }
}
