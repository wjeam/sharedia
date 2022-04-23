using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public abstract class GenericRepository<T> : IGenericRepository<T> where T : BaseModel
    {
        protected readonly IMongoCollection<T> Collection;

        protected GenericRepository(IMongoDatabase database)
        {
            Collection = database.GetCollection<T>(typeof(T).Name);
        }

        public async Task<T> GetByIdAsync(string id)
        {
            var cursor = await Collection.FindAsync(document => document.Id == id);
            return await cursor.FirstAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            var cursor = await Collection.FindAsync(_ => true);
            return cursor.ToEnumerable();
        }

        public async Task<DeleteResult> DeleteByIdAsync(string id)
        {
            return await Collection.DeleteOneAsync(document => document.Id == id);
        }

        public async Task CreateAsync(T item)
        {
            await Collection.InsertOneAsync(item);
        }

        public async Task<ReplaceOneResult> UpdateAsync(T item)
        {
            return await Collection.ReplaceOneAsync(document => document.Id == item.Id, item);
        }
    }
}