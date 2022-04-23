using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public class PostRepository : GenericRepository<Post>, IPostRepository
    {
        public PostRepository(IMongoDatabase database) : base(database)
        {
        }

        public async Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email)
        {
            var cursor = await Collection.FindAsync(document => document.UserEmail.Equals(email));

            return cursor.ToEnumerable();
        }

        public async Task<IEnumerable<Post>> GetMinorPostsAsync()
        {
            var cursor = await Collection.FindAsync(document => document.IsAdult == false);

            return cursor.ToEnumerable();
        }

        public async Task UpdatePostLikes(Post post, string userEmail)
        {
            await Collection.UpdateOneAsync(document => document.Id == post.Id, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }

        public async Task UpdatePostDislikes(Post post, string userEmail)
        {
            await Collection.UpdateOneAsync(document => document.Id == post.Id, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }
    }
}