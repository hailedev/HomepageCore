using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using HomepageCore.UI.Models;
using Microsoft.AspNetCore.Http;

namespace HomepageCore.UI.ViewModels
{
    public class ImageViewModel
    {
        public IFormFile Picture { get; set; }
        public string Caption { get; set; }
        public string Title { get; set; }
        public string Uri { get; set; }
        public IEnumerable<ImageModel> Images { get; set; }
    }
}