using Microsoft.AspNetCore.Mvc;
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
        public async Task CreatePostAsync(Post post)
        {
            await _postService.CreatePostAsync(post);
        }
    }
}
