using HomepageCore.Data.Repositories.Interfaces;

namespace HomepageCore.Data.Repositories
{
    public class ApplicationUnitOfWork : IApplicationUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public ApplicationUnitOfWork(ApplicationDbContext dbContext, IPostRepository postRepository, ICategoryRepository categoryRepository)
        {
            _dbContext = dbContext;
            Posts = postRepository;
            Categories = categoryRepository;
        }

        public IPostRepository Posts { get; set; }
        public ICategoryRepository Categories { get; set; }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }
    }
}