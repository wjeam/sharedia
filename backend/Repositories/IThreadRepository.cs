using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IThreadRepository : IGenericRepository<Thread>
    {
        Task<IEnumerable<Thread>> GetAllByParentId(string parentId);
    }
}