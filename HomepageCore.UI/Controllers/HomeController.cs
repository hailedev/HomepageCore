using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HomepageCore.Controllers
{
    [ApiExplorerSettings(IgnoreApi=true)]
    public class HomeController : Controller
    {
        private readonly ILogger _logger;

        public HomeController(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
        }
        
        public IActionResult Index(string userAgent = null)
        {
            if (string.IsNullOrEmpty(userAgent)) 
            { 
                userAgent = Request.Headers["User-Agent"]; 
            }
            return View(false);
        }

        private bool IsCrawler(string userAgent)
        {
            return Regex.IsMatch(userAgent, @"googlebot|bingbot|twitterbot|slurp|duckduckbot|baiduspider|facebot|linkedinbot", RegexOptions.IgnoreCase);
        }
    }
}