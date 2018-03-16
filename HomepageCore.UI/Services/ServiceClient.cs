using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using HomepageCore.UI.Models;
using HomepageCore.UI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using RestSharp;
using RestSharp.Authenticators;

namespace HomepageCore.UI.Services
{
    public class ServiceClient : RestClient, IServiceClient
    {
        IHttpContextAccessor _contextAccessor;

        public ServiceClient(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
            BaseUrl = new Uri("http://localhost:5001");

            var token = _contextAccessor.HttpContext.GetTokenAsync(OpenIdConnectDefaults.AuthenticationScheme, OpenIdConnectParameterNames.AccessToken).Result;
            if(token != null) 
            {
                Authenticator = new JwtAuthenticator(token);
            }
        }

        public async Task<List<ImageModel>> GetAsync()
        {
            var request = new RestRequest("/api/image");
            var result = await ExecuteTaskAsync<List<ImageModel>>(request);
            return result.Data;
        }

        public async Task<HttpStatusCode> PostAsync(ImageModel post)
        {
            var request = new RestRequest("/api/image", Method.POST);
            request.AddJsonBody(post);
            var result = await ExecuteTaskAsync<ImageModel>(request);
            return result.StatusCode;
        }

        public async Task<Guid> DeleteAsync(Guid id)
        {
            var request = new RestRequest("/api/image/{id}", Method.DELETE);
            request.AddParameter("id", id, ParameterType.UrlSegment);
            var result = await ExecuteTaskAsync<Guid>(request);
            return result.Data;
        }
    }
}