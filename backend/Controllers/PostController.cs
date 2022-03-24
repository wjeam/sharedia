using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sharedia.Dtos;
using sharedia.Models;
using sharedia.Services;
using System;
using System.IO;
using System.Threading.Tasks;
using sharedia.Mapper;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("post")]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;
        private const string StoragePath = @"C:\sharedia";

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        private async Task<PostDto> CreatePostAsync(IFormCollection form, string UID)
        {
            var postDto = new PostDto
            {
                Title = form["title"],
                Description = form["description"],
                IsAdult = bool.Parse(form["isAdult"]),
                UserEmail = form["userEmail"],
                FileName = form["fileName"],
                FileType = form["fileType"],
                MediaType = (MediaType) Enum.Parse(typeof(MediaType), form["mediaType"]),
                UID = UID,
            };

            await _postService.CreatePostAsync(postDto);
            return postDto;
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikePostAsync(string postId, string userEmail)
        {
            await _postService.LikePostAsync(postId, userEmail);
            return Ok();
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> DislikePostAsync(string postId, string userEmail)
        {
            await _postService.DislikePostAsync(postId, userEmail);
            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreatePostAsync()
        {
            var file = Request?.Form.Files[0];

            if (file == null)
            {
                return Problem("An error as occured processing your request, please try again later.");
            }

            var form = Request.Form;
            var UID = Guid.NewGuid().ToString();
            var newFilePath = $"{StoragePath}/{UID}.{form["fileType"]}";

            var postDto = await CreatePostAsync(form, UID);

            try
            {
                await using (var stream = System.IO.File.Create(newFilePath))
                {
                    await file.CopyToAsync(stream);
                }

                return Created("https://localhost:4131/post/media/" + postDto.Id, null);
            }
            catch (Exception)
            {
                return Problem("An error as occured, please try again later.");
            }
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetPostsByUserIdAsync(string email)
        {
            var posts = await _postService.GetPostsByUserEmailAsync(email);
            return Ok(PostMapper.ToDto(posts));
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeletePostAsync(string id)
        {
            await _postService.DeletePostByIdAsync(id);
            return Accepted();
        }

        [HttpGet("all-adult")]
        public async Task<IActionResult> GetAdultPostsAsync()
        {
            var posts = await _postService.GetAdultPostsAsync();
            var result = PostMapper.ToDto(posts);
            return Ok(result);
        }

        [HttpGet("media/{id}")]
        public async Task<FileResult> GetMediaAsync(string id)
        {
            var post = await _postService.GetPostAsync(id);
            var stream = new FileStream($"{StoragePath}/{post.UID}.{post.FileType}", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, FileOptions.Asynchronous);
            var fileStreamResult = new FileStreamResult(stream, $"{post.MediaType.ToString().ToLower()}/{post.FileType}")
            {
                EnableRangeProcessing = true
            };

            return fileStreamResult;
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
            var post = await _postService.GetPostAsync(id);

            if (post is null)
                return NotFound();

            return Ok(post);
        }
    }
}