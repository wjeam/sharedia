using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public class ThreadRepository : GenericRepository<Thread>, IThreadRepository
    {
        public ThreadRepository(IMongoDatabase database) : base(database)
        {

        }

        public async Task<IEnumerable<Thread>> GetAllByParentId(string parentId)
        {
            var cursor = await Collection.FindAsync(thread => thread.ParentId == parentId);
            return cursor.ToEnumerable();
        }
    }
}