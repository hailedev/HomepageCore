using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using HomepageCore.Data.Entities;

namespace HomepageCore.Data.Repositories.Interfaces
{
    public interface IPostRepository : IRepository<Post>
    {
        Task<IEnumerable<Post>> GetAllWithCategory();
        Task<IEnumerable<Post>> GetWithCategory(Expression<Func<Post, bool>> query);
    }
}