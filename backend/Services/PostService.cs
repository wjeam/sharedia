using System;
using sharedia.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using sharedia.Repositories;

namespace sharedia.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly ILogger<IPostService> _logger;

        private const string StoragePath = @"C:\sharedia";

        public PostService(IPostRepository postRepository, ILogger<IPostService> logger)
        {
            _postRepository = postRepository;
            _logger = logger;
        }

        public async Task<Post> CreatePostAsync(Post post, IFormFile file)
        {
            try
            {
                await _postRepository.CreateAsync(post);

                var newFilePath = $"{StoragePath}/{post.UID}.{post.FileType}";

                await using var stream = File.Create(newFilePath);

                await file.CopyToAsync(stream);
            }
            catch (Exception)
            {
                return null;
            }

            return post;
        }

        public async Task<Post> GetPostAsync(string id)
        {
            try
            {
                return await _postRepository.GetByIdAsync(id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            try
            {
                return await _postRepository.GetAllAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Post>> GetMinorPostsAsync()
        {
            try
            {
                return await _postRepository.GetMinorPostsAsync();
            }
            catch (Exception ex)
            {
            }

            return null;
        }

        public async Task<bool> DeletePostByIdAsync(string id)
        {
            try
            {
                var result = await _postRepository.DeleteByIdAsync(id);

                if (result.IsAcknowledged && result.DeletedCount > 0)
                {
                    return true;
                }
            }
            catch (Exception)
            {
            }

            return false;
        }

        public async Task DislikePostAsync(string postId, string userEmail)
        {
            try
            {
                var post = await _postRepository.GetByIdAsync(postId);

                if (post != null)
                {
                    post.Like.Remove(userEmail);
                    var added = post.Dislike.Add(userEmail);

                    if (!added)
                    {
                        post.Dislike.Remove(userEmail);
                    }

                    await _postRepository.UpdateDislikesAsync(post, userEmail);
                }
            }
            catch (Exception)
            {
            }
        }

        public async Task LikePostAsync(string postId, string userEmail)
        {
            try
            {
                var post = await _postRepository.GetByIdAsync(postId);

                if (post != null)
                {
                    post.Dislike.Remove(userEmail);
                    var added = post.Like.Add(userEmail);

                    if (!added)
                    {
                        post.Like.Remove(userEmail);
                    }

                    await _postRepository.UpdateLikesAsync(post, userEmail);
                }
            }
            catch (Exception)
            {
            }
        }

        public async Task<FileResult> GetFileAsync(string id)
        {
            var post = await GetPostAsync(id);

            try
            {
                var stream = new FileStream($"{StoragePath}/{post.UID}.{post.FileType}", FileMode.Open, FileAccess.Read,
                    FileShare.Read, 4096, FileOptions.Asynchronous);

                var fileStreamResult = new FileStreamResult(stream, $"{post.MediaType.ToString().ToLower()}/{post.FileType}")
                {
                    EnableRangeProcessing = true
                };

                return fileStreamResult;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email)
        {
            try
            {
                return await _postRepository.GetPostsByUserEmailAsync(email);
            }
            catch (Exception)
            {
            }

            return null;
        }
    }
}