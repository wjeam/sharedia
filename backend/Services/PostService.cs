using System;
using sharedia.Dtos;
using sharedia.Mapper;
using sharedia.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Repositories;

namespace sharedia.Services
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        public async Task<Post> CreatePostAsync(PostDto postDto)
        {
            var post = PostMapper.ToEntity(postDto);

            try
            {
                await _postRepository.CreateAsync(post);
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
            catch (Exception)
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
            catch (Exception)
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
            catch (Exception)
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

                    await _postRepository.UpdatePostDislikes(post, userEmail);
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

                    await _postRepository.UpdatePostLikes(post, userEmail);
                }
            }
            catch (Exception e)
            {
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