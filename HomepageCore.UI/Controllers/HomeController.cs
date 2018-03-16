using System;
using System.Linq;
using System.Text.RegularExpressions;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.UI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HomepageCore.Controllers
{
    [ApiExplorerSettings(IgnoreApi=true)]
    public class HomeController : Controller
    {
        private readonly ILogger _logger;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;

        public HomeController(ILoggerFactory loggerFactory, IApplicationUnitOfWork applicationUnitOfWork)
        {
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
            _applicationUnitOfWork = applicationUnitOfWork;
        }
        
        public IActionResult Index(string userAgent = null)
        {
            if (string.IsNullOrEmpty(userAgent)) 
            { 
                userAgent = Request.Headers["User-Agent"]; 
            }
            var model = new HomeModel{ Prerender = false };
            if(Request.Path.HasValue)
            {
                var pathElems = Request.Path.Value.Split('/').Where(x => !string.IsNullOrEmpty(x)).ToArray();
                if(pathElems.Length == 2 && pathElems.First().ToLower() == "post")
                {
                    Guid id;
                    if(Guid.TryParse(pathElems.Last(), out id))
                    {
                        var post = _applicationUnitOfWork.Posts.GetAll().First(x => x.Id == id);
                        if(post != null)
                        {
                            model.Title = post.Title;
                            model.Description = post.MetaDescription;
                            model.Image = $"{Request.Scheme}://{Request.Host}{post.MetaImage}";
                            model.Url = $"{Request.Scheme}://{Request.Host}{Request.Path.Value}";
                        }
                    }
                }
            }
            return View(model);
        }

        private bool IsCrawler(string userAgent)
        {
            return Regex.IsMatch(userAgent, @"googlebot|bingbot|twitterbot|slurp|duckduckbot|baiduspider|facebot|linkedinbot", RegexOptions.IgnoreCase);
        }
    }
}