using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IThreadService
    {
        Task CreateThreadAsync(Thread thread);

        Task<List<Thread>> GetAllThreadByParentIdAsync(string parentId);
    }
}