using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IPostRepository : IGenericRepository<Post>
    {
        Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email);

        Task<IEnumerable<Post>> GetMinorPostsAsync();

        Task UpdatePostLikes(Post post, string userEmail);

        Task UpdatePostDislikes(Post post, string userEmail);
    }
}