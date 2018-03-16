using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HomepageCore.Data.Entities;
using HomepageCore.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HomepageCore.Data.Repositories
{
    public class ImageRepository : Repository<Image>, IImageRepository
    {
        public ImageRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}