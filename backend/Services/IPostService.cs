using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IPostService
    {
        public Task<Post> CreatePostAsync(Post post, IFormFile file);

        public Task<Post> GetPostAsync(string id);

        public Task<IEnumerable<Post>> GetPostsAsync();

        public Task<IEnumerable<Post>> GetMinorPostsAsync();

        public Task DeletePostByIdAsync(string id);

        public Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email);

        public Task DislikePostAsync(string postId, string userEmail);

        public Task LikePostAsync(string postId, string userEmail);

        public Task<FileResult> GetFileAsync(string id);
    }
}