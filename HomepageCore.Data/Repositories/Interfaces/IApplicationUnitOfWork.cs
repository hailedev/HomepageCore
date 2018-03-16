namespace HomepageCore.Data.Repositories.Interfaces
{
    public interface IApplicationUnitOfWork
    {
        IPostRepository Posts { get; set; }
        ICategoryRepository Categories { get; set; }
        IImageRepository Images { get; set; }
        void Commit();
    }
}