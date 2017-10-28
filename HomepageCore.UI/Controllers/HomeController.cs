using System;
using Microsoft.AspNetCore.Mvc;

namespace HomepageCore.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}