using System;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace HomepageCore.Controllers
{
    [ApiExplorerSettings(IgnoreApi=true)]
    public class HomeController : Controller
    {
        public IActionResult Index(string userAgent = null)
        {
            if (string.IsNullOrEmpty(userAgent)) 
            { 
                userAgent = Request.Headers["User-Agent"]; 
            }
            return View(IsCrawler(userAgent));
        }

        private bool IsCrawler(string userAgent)
        {
            return Regex.IsMatch(userAgent, @"googlebot|bingbot|twitterbot|slurp|duckduckbot|baiduspider|facebot", RegexOptions.IgnoreCase);
        }
    }
}