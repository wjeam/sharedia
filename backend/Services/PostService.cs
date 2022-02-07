using MongoDB.Bson;
using MongoDB.Driver;
using sharedia.Dtos;
using sharedia.Mapper;
using sharedia.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace sharedia.Services
{
    public class PostService
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

        public async Task<IEnumerable<Post>> GetPostsByUserIdAsync(string id)
        {
            var posts = await _posts.FindAsync(documents => documents.UserId.Equals(ObjectId.Parse(id)));
            return posts.ToEnumerable();
        }
    }
}
