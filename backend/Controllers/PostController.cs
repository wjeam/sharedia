using Microsoft.AspNetCore.Mvc;
using sharedia.Dtos;
using sharedia.Services;
using System.Threading.Tasks;
using sharedia.Attributes;
using sharedia.Exceptions;
using sharedia.Mapper;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("post")]
    [ApiKeyAuthorization]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikePostAsync(string postId, string userEmail)
        {
            await _postService.LikePostAsync(postId, userEmail);
            return NoContent();
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> DislikePostAsync(string postId, string userEmail)
        {
            await _postService.DislikePostAsync(postId, userEmail);
            return NoContent();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePostAsync([FromForm] PostDto postDto)
        {
            if (postDto == null)
            {
                return Problem("An error as occured processing your request, please try again later.");
            }

            var file = postDto.File;
            var post = PostMapper.ToEntity(postDto);

            post = await _postService.CreatePostAsync(post, file);

            return Created($"/post/{post.Id}", post);
        }

        [HttpGet("user/{email}")]
        public async Task<IActionResult> GetPostsByUserIdAsync(string email)
        {
            var posts = await _postService.GetPostsByUserEmailAsync(email);
            return Ok(PostMapper.ToDto(posts));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePostAsync(string id)
        {
            try
            {
                await _postService.DeletePostByIdAsync(id);
                return NoContent();
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpGet("minor")]
        public async Task<IActionResult> GetMinorPostsAsync()
        {
            var posts = await _postService.GetMinorPostsAsync();
            var result = PostMapper.ToDto(posts);
            return Ok(result);
        }

        [HttpGet("media/{id}")]
        public async Task<FileResult> GetMediaAsync(string id)
        {
            var file = await _postService.GetFileAsync(id);
            return file;
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetPostsAsync()
        {
            var posts = await _postService.GetPostsAsync();
            var result = PostMapper.ToDto(posts);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostAsync(string id)
        {
            try
            {
                var post = await _postService.GetPostAsync(id);
                return Ok(post);
            }
            catch (PostNotFoundException)
            {
                return NotFound();
            }
        }
    }
}