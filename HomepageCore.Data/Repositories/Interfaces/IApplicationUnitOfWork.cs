namespace HomepageCore.Data.Repositories.Interfaces
{
    public interface IApplicationUnitOfWork
    {
        PostRepository Posts { get; set; }
        CategoryRepository Categories { get; set; }
        void Commit();
    }
}