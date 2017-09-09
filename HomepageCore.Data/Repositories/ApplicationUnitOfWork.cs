using HomepageCore.Data.Repositories.Interfaces;

namespace HomepageCore.Data.Repositories
{
    public class ApplicationUnitOfWork : IApplicationUnitOfWork
    {
        private readonly ApplicationDbContext _dbContext;
        public ApplicationUnitOfWork(ApplicationDbContext dbContext, PostRepository postRepository, CategoryRepository categoryRepository)
        {
            _dbContext = dbContext;
            Posts = postRepository;
            Categories = categoryRepository;
        }

        public PostRepository Posts { get; set; }
        public CategoryRepository Categories { get; set; }

        public void Commit()
        {
            _dbContext.SaveChanges();
        }
    }
}