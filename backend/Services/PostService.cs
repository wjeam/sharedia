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
            try
            {
                var post = PostMapper.ToEntity(postDto);
                await _posts.InsertOneAsync(post);
                return post;
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<Post> GetPostAsync(string id)
        {
            var cursor = await _posts.FindAsync(document => document.Id == id);
            var post = await cursor.FirstOrDefaultAsync();
            return post;
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            var posts = await _posts.FindAsync(document => document.IsAdult == false);
            return posts.ToEnumerable();
        }

        public async Task<IEnumerable<Post>> GetAdultPostsAsync()
        {
            var posts = await _posts.FindAsync(document => document.IsAdult == true);
            return posts.ToEnumerable();
        }

        public async Task DeletePostAsync(string id)
        {
            await _posts.DeleteOneAsync(document => document.Id == id);
        }

        public async Task<IEnumerable<Post>> GetPostsByUserIdAsync(string id)
        {
            var posts = await _posts.FindAsync(documents => documents.UserId == id);
            return posts.ToEnumerable();
        }
    }
}
