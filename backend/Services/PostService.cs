using MongoDB.Driver;
using sharedia.Models;
using System.Threading.Tasks;

namespace sharedia.Services
{
    public class PostService
    {
        private readonly IMongoCollection<Post> _posts;

        public PostService(IMongoDatabase database)
        {
            _posts = database.GetCollection<Post>("post");
        }

        public async Task CreatePostAsync(Post post)
        {
            // Implement mapper
            await _posts.InsertOneAsync(new Post { Title = post.Title, UserId = post.UserId, MediaId = post.MediaId, IsAdult = post.IsAdult });
        }
    }
}
