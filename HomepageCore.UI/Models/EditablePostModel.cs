using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomepageCore.Models
{
    public class EditablePostModel : PostModel
    {
        public string Raw { get; set; }
    }
}
