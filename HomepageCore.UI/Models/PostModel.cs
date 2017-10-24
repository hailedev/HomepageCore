using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomepageCore.Models
{
    public class PostModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Blurb { get; set; }
        public string Content { get; set; }
        public string Tags { get; set; }
        public Guid CategoryId { get; set; }
        public int Day { get; set; }
        public string Month { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
