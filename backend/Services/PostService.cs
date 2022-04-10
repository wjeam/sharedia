using MongoDB.Driver;
using sharedia.Dtos;
using sharedia.Mapper;
using sharedia.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace sharedia.Services
{
    public class PostService : IPostService
    {
        private readonly IMongoCollection<Post> _posts;

        public PostService(IMongoDatabase database)
        {
            _posts = database.GetCollection<Post>("posts");
        }

        public async Task<Post> CreatePostAsync(PostDto postDto)
        {
            var post = PostMapper.ToEntity(postDto);
            await _posts.InsertOneAsync(post);
            return post;
        }

        public async Task<Post> GetPostAsync(string id)
        {
            var cursor = await _posts.FindAsync(document => document.Id == id);
            var post = await cursor.FirstAsync();
            return post;
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            var posts = await _posts.FindAsync(document => document.IsAdult == false);
            return posts.ToEnumerable();
        }

        public async Task<IEnumerable<Post>> GetAdultPostsAsync()
        {
            var posts = await _posts.FindAsync(_ => true);
            return posts.ToEnumerable();
        }

        public async Task DeletePostByIdAsync(string id)
        {
            await _posts.DeleteOneAsync(document => document.Id == id);
        }

        public async Task DislikePostAsync(string postId, string userEmail)
        {
            var cursor = await _posts.FindAsync(f => f.Id == postId);
            var post = await cursor.FirstAsync();

            post.Like.Remove(userEmail);
            var added = post.Dislike.Add(userEmail);

            if(!added)
                post.Dislike.Remove(userEmail);

            await _posts.UpdateOneAsync(document => document.Id == postId, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }

        public async Task LikePostAsync(string postId, string userEmail)
        {
            var cursor = await _posts.FindAsync(f => f.Id == postId);
            var post = await cursor.FirstAsync();

            post.Dislike.Remove(userEmail);
            var added = post.Like.Add(userEmail);

            if(!added)
                post.Like.Remove(userEmail);

            await _posts.UpdateOneAsync(document => document.Id == postId, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }

        public async Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email)
        {
            var cursor = await _posts.FindAsync(document => document.UserEmail.Equals(email));
            return cursor.ToEnumerable();
        }
    }
}