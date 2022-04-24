using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email);

        Task<IEnumerable<Post>> GetMinorPostsAsync();

        Task UpdateLikesAsync(Post post, string userEmail);

        Task UpdateDislikesAsync(Post post, string userEmail);
    }
}