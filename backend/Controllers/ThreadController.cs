using Microsoft.AspNetCore.Mvc;
using sharedia.Dtos;
using sharedia.Services;
using System.Threading.Tasks;
using sharedia.Attributes;
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

            await _threadService.CreateThreadAsync(thread);

            return Ok(thread);
        }


        [HttpGet("{parentId}")]
        public async Task<IActionResult> GetAllThreadsByParentId(string parentId)
        {
            var threads = await _threadService.GetAllThreadByParentIdAsync(parentId);

            return Ok(threads);
        }
    }
}