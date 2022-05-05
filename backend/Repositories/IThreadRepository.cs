using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IThreadRepository : IGenericRepository<Thread>
    {
        Task<IEnumerable<Thread>> GetAllByParentId(string parentId);

        Task<DeleteResult> DeleteThreadAndNestedById(string id);
    }
}