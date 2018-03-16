using System;

namespace HomepageCore.UI.Models
{
    public class ImageModel
    {
        public Guid Id { get; set; }
        public byte[] PictureBytes { get; set; }
        public string Caption { get; set; }
        public string Title { get; set; }
        public string Uri { get; set; }
    }
}