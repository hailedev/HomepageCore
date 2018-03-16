using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using HomepageCore.Data.Entities;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.UI.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileProviders;
using NSwag.Annotations;

namespace HomepageCore.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class ImageController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;

        public ImageController(IHostingEnvironment hostingEnvironment, IApplicationUnitOfWork applicationUnitOfWork)
        {
            _hostingEnvironment = hostingEnvironment;
            _applicationUnitOfWork = applicationUnitOfWork;
        }

        [HttpGet]
        [SwaggerResponse(typeof(IEnumerable<ImageModel>), Description = "All the images in the system")]
        [Description("Returns all images in the system")]
        public IActionResult Get()
        {
            try
            {
                return Json(_applicationUnitOfWork.Images.GetAll());
            }
            catch
            {
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }

        [HttpPost]
        [SwaggerResponse(typeof(ImageModel), Description = "New or updated image with guid populated")]
        [Description("Creates or updates an image")]
        public async Task<IActionResult> Post([FromBody]ImageModel model)
        {
            try
            {
                // Ensure the directory is created
                var directory = $"{_hostingEnvironment.WebRootPath}/images/posts";
                System.IO.Directory.CreateDirectory(directory);

                // Add the file to the posts directory
                var uri = $"/images/posts/{model.Title}.jpg";
                var absolutePath = $"{_hostingEnvironment.WebRootPath}{uri}";
                await System.IO.File.WriteAllBytesAsync(absolutePath, model.PictureBytes);

                var image = new Image { Title = model.Title, Caption = model.Caption, Uri = uri };
                _applicationUnitOfWork.Images.Add(image);
                _applicationUnitOfWork.Commit();
                
                return Created(uri, image.Id);
            }
            catch
            {
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }

        [HttpDelete("{id?}")]
        [SwaggerResponse(typeof(Guid), Description = "The id of the image to delete")]
        [Description("Deletes an image")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var image = _applicationUnitOfWork.Images.GetAll().FirstOrDefault(x => x.Id == id);
                if(image == null)
                {
                    return NotFound();
                }
                _applicationUnitOfWork.Images.Delete(image);
                _applicationUnitOfWork.Commit();

                var uri = $"/images/posts/{image.Title}.jpg";
                var absolutePath = $"{_hostingEnvironment.WebRootPath}{uri}";
                System.IO.File.Delete(absolutePath);
                return Json(id);
            }
            catch
            {
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }
    }
}