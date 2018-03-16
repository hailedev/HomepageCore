using System;

namespace HomepageCore.Data.Entities
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Caption { get; set; }
        public string Uri { get; set; }
    }
}