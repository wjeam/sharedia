using Microsoft.AspNetCore.Mvc;
using sharedia.Dtos;
using sharedia.Services;
using System.Threading.Tasks;
using sharedia.Mapper;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("thread")]
    public class ThreadController : ControllerBase
    {
        private readonly ThreadService _threadService;

        public ThreadController(ThreadService threadService)
        {
            _threadService = threadService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateThreadAsync([FromBody] ThreadDto threadDto)
        {
            var thread = ThreadMapper.ToEntity(threadDto);
            var newThread = await _threadService.CreateThreadAsync(thread);
            return Ok(newThread);
        }


        [HttpGet("{parentId}")]
        public async Task<IActionResult> GetAllThreadsByParentId(string parentId)
        {
            var threads = await _threadService.GetAllThreadByParentIdAsync(parentId);
            return Ok(threads);
        }
    }
}