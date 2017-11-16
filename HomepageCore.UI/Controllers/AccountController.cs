using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using HomepageCore.Data.Entities;
using HomepageCore.Models;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Logging;

namespace HomepageCore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(IgnoreApi=true)]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IMapper mapper, ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
        }

        [HttpGet]
        [Route("external-login")]
        [AllowAnonymous]
        public IActionResult ExternalLogin(string provider = "Google", string returnUrl = "")
        {
            var callback = $"{GetHost(Request)}/api/account/external-callback";
            if (!string.IsNullOrEmpty(returnUrl))
            {
                callback = $"{callback}?returnUrl={System.Net.WebUtility.UrlEncode(returnUrl)}";
            }
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, callback);
            return Challenge(properties, provider);
        }

        [HttpGet]
        [Route("external-callback")]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = "")
        {
            var loginInfo = await _signInManager.GetExternalLoginInfoAsync();
            if (loginInfo == null)
            {
                // redirect to homepage
                return BadRequest();
            }

            // Sign in the user with this external login provider if the user already has a login
            var result = await _signInManager.ExternalLoginSignInAsync(loginInfo.LoginProvider, loginInfo.ProviderKey, false);
            if (result.Succeeded)
            {
                var emailClaim = loginInfo.Principal.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);
                if (emailClaim != null)
                {
                    var redirectUrl = !string.IsNullOrEmpty(returnUrl) ? returnUrl : "/";
                    return Redirect(redirectUrl);
                }
            }

            return Redirect("/");
        }

        [HttpGet]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Redirect("/?_=_");
        }

        [HttpGet]
        [Route("userinfo")]
        public async Task<IActionResult> UserInfo()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);

                if (user != null)
                {
                    return Json(_mapper.Map<UserInfoModel>(user));
                }
                _logger.LogWarning($"Login attempt failed from: {Request.HttpContext.Connection.RemoteIpAddress}");
                return BadRequest(new { Errors = new[] { "Invalid user" } });
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }

        private static string GetHost(HttpRequest request)
        {
            return $"{request.Scheme}://{request.Host.Value}";
        }
    }
}
