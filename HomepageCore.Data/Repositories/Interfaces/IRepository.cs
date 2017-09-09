using System;
using System.Linq;

namespace HomepageCore.Data.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        IQueryable<T> GetAll();

        T GetById(Guid id);

        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        void Delete(Guid id);
    }
}