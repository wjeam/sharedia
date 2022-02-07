using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver.GridFS;
using sharedia.Dtos;
using sharedia.Models;
using sharedia.Services;
using System;
using System.Text;
using System.Threading.Tasks;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("post")]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;
        private readonly MediaService _mediaService;
        private const string _storagePath = @"C:\sharedia";

        public PostController(PostService postService, MediaService mediaService)
        {
            _postService = postService;
            _mediaService = mediaService;
        }

        // SERVICE LOGIC
        private async Task CreatePostAsync(IFormCollection form, string mediaId)
        {
            var postDto = new PostDto()
            {
                Title = form["title"],
                Description = form["description"],
                IsAdult = Boolean.Parse(form["isAdult"]),
                MediaId = mediaId,
                UserId = "###"
            };

            await _postService.CreatePostAsync(postDto);
        }

        // SERVICE LOGIC
        private async Task<string> CreateMediaAsync(IFormCollection form, string filePath)
        {
            var media = new Media()
            {
                Filename = form["filename"],
                Filetype = form["fileType"],
                MediaType = (MediaType)Enum.Parse(typeof(MediaType), form["mediaType"]),
                FilePath = filePath,
            };

            var id = await _mediaService.InsertMediaAsync(media);
            return id;
        }

        // REFACTOR
        [HttpPost("create")]
        public async Task<IActionResult> CreatePostAsync()
        {
            var file = Request.Form.Files[0];
            var form = Request.Form;

            var filePath = Guid.NewGuid().ToString();
            var newFilePath = new StringBuilder();

            var mediaId = await CreateMediaAsync(form, filePath);
            await CreatePostAsync(form, mediaId);

            newFilePath.Append(_storagePath);
            newFilePath.Append("/");
            newFilePath.Append(filePath);
            newFilePath.Append(".");
            newFilePath.Append(form["fileType"]);

            using (var stream = System.IO.File.Create(newFilePath.ToString()))
            {
                await file.CopyToAsync(stream);
            }

            // REMOVE HARDCODED 
            return Created("https://localhost:4131/media/" + mediaId, null);
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
            await _postService.DeletePostByIdAsync(id);
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

            if (post == null)
                return NotFound();

            return Ok(post);
        }
    }
}
