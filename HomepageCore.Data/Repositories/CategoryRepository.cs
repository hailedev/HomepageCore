using HomepageCore.Data.Entities;
using HomepageCore.Data.Repositories.Interfaces;

namespace HomepageCore.Data.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(ApplicationDbContext dbContext) : base(dbContext)
        {
        }
    }
}