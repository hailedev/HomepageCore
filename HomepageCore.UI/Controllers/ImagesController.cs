using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using HomepageCore.UI.Models;
using HomepageCore.UI.Services.Interfaces;
using HomepageCore.UI.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace HomepageCore.Controllers
{
    [Authorize]
    [ApiExplorerSettings(IgnoreApi=true)]
    public class ImagesController : Controller
    {
        private readonly ILogger _logger;
        private readonly Func<IServiceClient> _serviceClientFactory;

        public ImagesController(ILoggerFactory loggerFactory, Func<IServiceClient> serviceClientFactory)
        {
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
            _serviceClientFactory = serviceClientFactory;
        }

        public async Task<IActionResult> Index()
        {
            var client = _serviceClientFactory();
            var vm = new ImageViewModel();
            vm.Images = await client.GetAsync();

            return View(vm);
        }

        [HttpPost]
        public async Task<ActionResult> Index(ImageViewModel viewModel)
        {
            try
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    viewModel.Picture.CopyTo(ms);
                    fileBytes = ms.ToArray();
                }

                var model = new ImageModel {
                    Caption = viewModel.Caption,
                    Title = viewModel.Title,
                    PictureBytes = fileBytes
                };

                var client = _serviceClientFactory();
                var result = await client.PostAsync(model);
                if(result == HttpStatusCode.OK || result == HttpStatusCode.Created)
                {
                    return RedirectToAction("Index", "Images");
                }
                else
                {
                    return View("Error");
                }
            }
            catch (Exception)
            {
                return View("Error");
            }
        }

        public async Task<ActionResult> Delete(Guid id)
        {
            try
            {
                var client = _serviceClientFactory();
                var result = await client.DeleteAsync(id);
                return RedirectToAction("Index", "Images");
            }
            catch (Exception)
            {
                return View("Error");
            }
        }

        public async Task<ActionResult> Logout()
        {
            // Sign out of identity server
            var idToken = await HttpContext.GetTokenAsync(OpenIdConnectDefaults.AuthenticationScheme, OpenIdConnectParameterNames.IdToken);
            return Redirect($"http://localhost:5000/connect/endsession?id_token_hint={idToken}");
        }
    }
}