using System;

namespace HomepageCore.Models
{
    public class HomeModel
    {
        public string Title { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public bool Prerender { get; set; }
    }
}