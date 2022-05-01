using System;
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
    [Route("thread")]
    [ApiKeyAuthorization]
    public class ThreadController : ControllerBase
    {
        private readonly IThreadService _threadService;

        public ThreadController(IThreadService threadService)
        {
            _threadService = threadService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateThreadAsync([FromBody] ThreadDto threadDto)
        {
            var thread = ThreadMapper.ToEntity(threadDto);

            try
            {
                await _threadService.CreateThreadAsync(thread);

                return Created($"/thread/{thread.Id}", thread);
            }
            catch (Exception)
            {
                return Problem("An error has occured while creating thread, please try again later", title: "Internal server error",statusCode: 500);
            }
        }

        [HttpPost("like")]
        public async Task<IActionResult> LikeThreadAsync([FromQuery] string threadId, [FromQuery] string userEmail)
        {
            try
            {
                await _threadService.LikeThreadAsync(threadId, userEmail);

                return NoContent();
            }
            catch (ThreadNotFoundException)
            {
                return Problem($"Thread identified by id {threadId} does not exists.", title: "Not found", statusCode: 404);
            }
        }

        [HttpPost("dislike")]
        public async Task<IActionResult> DislikeThreadAsync([FromQuery] string threadId, [FromQuery] string userEmail)
        {
            try
            {
                await _threadService.DislikeThreadAsync(threadId, userEmail);

                return NoContent();
            }
            catch (ThreadNotFoundException)
            {
                return Problem($"Thread identified by id {threadId} does not exists.", title: "Not found", statusCode: 404);
            }
        }

        [HttpGet("{parentId}")]
        public async Task<IActionResult> GetAllThreadsByParentId(string parentId)
        {
            try
            {
                var threads = await _threadService.GetAllThreadByParentIdAsync(parentId);

                return Ok(threads);
            }
            catch (ThreadNotFoundException)
            {
                return Problem($"Thread identified by id {parentId} does not exists.", title: "Not found", statusCode: 404);
            }
        }
    }
}