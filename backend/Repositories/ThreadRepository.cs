using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public class ThreadRepository : GenericRepository<Thread>
    {
        public ThreadRepository(IMongoDatabase database) : base(database)
        {
        }
    }
}