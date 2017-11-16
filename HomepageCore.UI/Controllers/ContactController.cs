using System;
using System.ComponentModel;
using System.Threading.Tasks;
using HomepageCore.Models;
using HomepageCore.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace HomepageCore.Controllers
{
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class ContactController : Controller
    {
        private readonly IEmailSender _emailSender;
        private readonly ILogger _logger;

        public ContactController(IEmailSender emailSender, ILoggerFactory loggerFactory)
        {
            _emailSender = emailSender;
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
        }

        [HttpPost]
        [Description("Sends an email to the administrator email address")]
        public async Task<IActionResult> Post([FromBody] ContactModel model)
        {
            try
            {
                var message = $"{model.Name} wrote:{Environment.NewLine}{model.Message}";
                if (await _emailSender.SendEmailAsync(model.Email, "Message From Homepage", message, model.Name))
                {
                    return Json(new { success = true });
                }

                return BadRequest();
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }
    }
}
