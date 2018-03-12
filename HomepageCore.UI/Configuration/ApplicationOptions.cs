using System.Collections.Generic;

namespace HomepageCore.UI.Configuration
{
    public class ApplicationOptions
    {
        public Dictionary<string, string> ConnectionStrings { get; set; }
        public int PageSize { get; set; }
        public EmailOptions Email { get; set; }
    }
}