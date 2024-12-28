using System;
using System.ComponentModel;
using System.Dynamic;
using System.Threading.Tasks;
using HomepageCore.UI.Models;
using HomepageCore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HomepageCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class ContactController : Controller
    {
        private readonly IEmailSender _emailSender;
        private readonly ILogger<ContactController> _logger;

        public ContactController(IEmailSender emailSender, ILogger<ContactController> logger)
        {
            _emailSender = emailSender;
            _logger = logger;
        }

        [HttpPost]
        [Description("Sends an email to the administrator email address")]
        public IActionResult Post([FromBody] ContactModel model)
        {
            try
            {
                var message =  $"<p>Name: {model.Name}</p><p>Email: {model.Email}<p>Message: {model.Message}</p>";
                _emailSender.SendEmailAsync(model.Email, "Message From haile.info", message, model.Name);

                return Json(new { success = true });
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }
    }
}
