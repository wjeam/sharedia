using MongoDB.Driver;
using sharedia.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace sharedia.Services
{
    public class ThreadService
    {
        private readonly IMongoCollection<Thread> _threads;

        public ThreadService(IMongoDatabase database)
        {
            _threads = database.GetCollection<Thread>("threads");
        }

        public async Task<List<Thread>> GetAllThreadByParentIdAsync(string parentId)
        {
            var cursor = await _threads.FindAsync(thread => thread.ParentId == parentId);
            var threads = cursor.ToList();

            return threads;
        }

        public async Task<Thread> CreateThreadAsync(Thread thread)
        {
            await _threads.InsertOneAsync(thread);
            return thread;
        }
    }
}