using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IThreadService
    {
        Task CreateThreadAsync(Thread thread);

        Task<List<Thread>> GetAllThreadByParentIdAsync(string parentId);

        Task DislikeThreadAsync(string parentId, string userEmail);

        Task LikeThreadAsync(string parentId, string userEmail);

        Task DeleteThreadAsync(string id);
    }
}