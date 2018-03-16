using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using HomepageCore.UI.Models;
using RestSharp;

namespace HomepageCore.UI.Services.Interfaces
{
    public interface IServiceClient : IRestClient
    {
        Task<List<ImageModel>> GetAsync();
        Task<HttpStatusCode> PostAsync(ImageModel post);
        Task<Guid> DeleteAsync(Guid id);
    }
}