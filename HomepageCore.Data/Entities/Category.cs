using System;

namespace HomepageCore.Data.Entities
{
    public class Category
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Properties { get; set; }
    }
}