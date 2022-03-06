using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Dtos;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IPostService
    {
        public Task<Post> CreatePostAsync(PostDto postDto);
        public Task<Post> GetPostAsync(string id);
        public Task<IEnumerable<Post>> GetPostsAsync();
        public Task<IEnumerable<Post>> GetAdultPostsAsync();
        public Task DeletePostByIdAsync(string id);
        public Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email);
        public Task DislikePostAsync(string postId, string userEmail);
        public Task LikePostAsync(string postId, string userEmail);
    }
}