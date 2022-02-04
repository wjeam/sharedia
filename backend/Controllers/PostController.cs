using Microsoft.AspNetCore.Mvc;
using sharedia.Dtos;
using sharedia.Models;
using sharedia.Services;
using System;
using System.Collections;
using System.Threading.Tasks;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("post")]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        } 

        [HttpPost("create")]
        public async Task<IActionResult> CreatePostAsync(PostDto postDto)
        {
            var post = await _postService.CreatePostAsync(postDto);
            // Remove hardcoded URI
            return Created($"https://localhost:5001/post/{post.Id}", post);
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetPostsByUserIdAsync(string id)
        {
            var posts = await _postService.GetPostsByUserIdAsync(id);
            return Ok(posts);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePostAsync(string id)
        {
            await _postService.DeletePostAsync(id);
            return Accepted();
        }

        [HttpGet("all-adult")]
        public async Task<IActionResult> GetAdultPostsAsync()
        {
            var posts = await _postService.GetAdultPostsAsync();
            return Ok(posts);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetPostsAsync()
        {
            var posts = await _postService.GetPostsAsync();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostAsync(string id)
        {
            var post = await _postService.GetPostAsync(id);
            
            if(post == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(post);
            }
        }
    }
}
