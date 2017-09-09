using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HomepageCore.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace HomepageCore.Data.Repositories
{
    public class PostRepository : Repository<Post>
    {
        public PostRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Post>> GetAllWithCategory()
        {
            return await DbSet.Include(x => x.Category).ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetWithCategory(Expression<Func<Post, bool>> query)
        {
            return await DbSet.Include(x => x.Category).Where(query).ToListAsync();
        }
    }
}