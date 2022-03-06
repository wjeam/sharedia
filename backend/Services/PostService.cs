﻿using MongoDB.Driver;
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

            post.Like.TryRemove(userEmail, out _);
            var added = post.Dislike.TryAdd(userEmail, 1);

            if(!added)
                post.Dislike.TryRemove(userEmail, out _);

            await _posts.UpdateOneAsync(f => f.Id == postId, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }

        public async Task LikePostAsync(string postId, string userEmail)
        {
            var cursor = await _posts.FindAsync(f => f.Id == postId);
            var post = await cursor.FirstAsync();

            post.Dislike.TryRemove(userEmail, out _);
            var added = post.Like.TryAdd(userEmail, 1);

            if(!added)
                post.Like.TryRemove(userEmail, out _);

            await _posts.UpdateOneAsync(f => f.Id == postId, Builders<Post>.Update
                .Set(p => p.Like, post.Like)
                .Set(p => p.Dislike, post.Dislike));
        }

        public async Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email)
        {
            var posts = await _posts.FindAsync(documents => documents.UserEmail.Equals(email));
            return posts.ToEnumerable();
        }
    }
}