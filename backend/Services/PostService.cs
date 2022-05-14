using System;
using sharedia.Models;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sharedia.Exceptions;
using sharedia.Repositories;

namespace sharedia.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly IReportRepository _reportRepository;

        private const string StoragePath = @"C:\sharedia";

        public PostService(IPostRepository postRepository, IReportRepository reportRepository)
        {
            _postRepository = postRepository;
            _reportRepository = reportRepository;
        }

        public async Task<Post> CreatePostAsync(Post post, IFormFile file)
        {
            await _postRepository.CreateAsync(post);

            var newFilePath = $"{StoragePath}/{post.UID}.{post.FileType}";

            await using var stream = File.Create(newFilePath);

            await file.CopyToAsync(stream);

            return post;
        }

        public async Task<Post> GetPostAsync(string id)
        {
            try
            {
                return await _postRepository.GetByIdAsync(id);
            }
            catch (Exception)
            {
                throw new PostNotFoundException();
            }
        }

        public async Task<IEnumerable<Post>> GetPostsAsync()
        {
            return await _postRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Post>> GetMinorPostsAsync()
        {
            return await _postRepository.GetMinorPostsAsync();
        }

        public async Task DeletePostByIdAsync(string id)
        {
            try
            {
                await _postRepository.DeleteByIdAsync(id);
                await _reportRepository.DeleteReportsByPostId(id);
            }
            catch (Exception)
            {
                throw new PostNotFoundException();
            }
        }

        public async Task DislikePostAsync(string postId, string userEmail)
        {
            var post = await GetPostAsync(postId);


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
            else
            {
                throw new PostNotFoundException();
            }
        }

        public async Task LikePostAsync(string postId, string userEmail)
        {
            var post = await GetPostAsync(postId);

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
            else
            {
                throw new PostNotFoundException();
            }
        }

        public async Task<FileResult> GetFileAsync(string id)
        {
            var post = await GetPostAsync(id);

            var stream = new FileStream($"{StoragePath}/{post.UID}.{post.FileType}", FileMode.Open, FileAccess.Read,
                FileShare.Read, 4096, FileOptions.Asynchronous);

            var fileStreamResult = new FileStreamResult(stream, $"{post.MediaType.ToString().ToLower()}/{post.FileType}")
            {
                EnableRangeProcessing = true
            };

            return fileStreamResult;
        }

        public async Task<IEnumerable<Post>> GetPostsByUserEmailAsync(string email)
        {
            return await _postRepository.GetPostsByUserEmailAsync(email);
        }
    }
}