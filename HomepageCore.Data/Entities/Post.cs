using System;

namespace HomepageCore.Data.Entities
{
    public class Post
    {        
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Blurb { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string Tags { get; set; }
        public string Raw { get; set; }
        public virtual Category Category { get; set; }
    }
}