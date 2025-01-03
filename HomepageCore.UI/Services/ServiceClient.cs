using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using HomepageCore.UI.Configuration;
using HomepageCore.UI.Models;
using HomepageCore.UI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using RestSharp;
using RestSharp.Authenticators;

namespace HomepageCore.UI.Services
{
    public class ServiceClient : IServiceClient, IDisposable
    {
        private readonly IRestClient _client;
        private readonly IHttpContextAccessor _contextAccessor;

        public ServiceClient(IHttpContextAccessor contextAccessor, IOptions<ApplicationOptions> optionsAccessor) 
        {
            _contextAccessor = contextAccessor;

            var restClientOptions = new RestClientOptions { BaseUrl = new Uri(optionsAccessor.Value.OpenIdConnect.RedirectUri) };
            var token = _contextAccessor.HttpContext.GetTokenAsync("OpenIdConnect", OpenIdConnectParameterNames.AccessToken).Result;
            if(token != null) 
            {
                restClientOptions.Authenticator = new JwtAuthenticator(token);
            }
            _client = new RestClient(restClientOptions);
        }

        public async Task<List<ImageModel>> GetAsync()
        {
            var request = new RestRequest("/api/image");
            var result = await _client.ExecuteAsync<List<ImageModel>>(request);
            return result.Data;
        }

        public async Task<HttpStatusCode> PostAsync(ImageModel post)
        {
            var request = new RestRequest("/api/image", Method.Post);
            request.AddJsonBody(post);
            var result = await _client.ExecuteAsync<ImageModel>(request);
            return result.StatusCode;
        }

        public async Task<Guid> DeleteAsync(Guid id)
        {
            var request = new RestRequest("/api/image/{id}", Method.Delete);
            request.AddParameter("id", id, ParameterType.UrlSegment);
            var result = await _client.ExecuteAsync<Guid>(request);
            return result.Data;
        }

        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}