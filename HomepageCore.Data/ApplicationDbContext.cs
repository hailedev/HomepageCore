using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using HomepageCore.Data.Entities;
using HomepageCore.Common.Configuration;
using Microsoft.Extensions.Options;

namespace HomepageCore.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        private readonly ApplicationOptions _applicationOptions;

        public ApplicationDbContext(IOptions<ApplicationOptions> optionsAccessor)
        {
            _applicationOptions = optionsAccessor.Value;
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(_applicationOptions.ConnectionStrings["DefaultConnection"]);
        }
    }
}