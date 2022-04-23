using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IGenericRepository<T> where T : BaseModel
    {
        public Task<T> GetByIdAsync(string id);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<DeleteResult> DeleteByIdAsync(string id);

        public Task CreateAsync(T item);

        public Task<ReplaceOneResult> UpdateAsync(T item);
    }
}