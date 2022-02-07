using Microsoft.AspNetCore.Mvc;
using sharedia.Services;
using System.IO;
using System.Threading.Tasks;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("media")]
    public class MediaController : Controller
    {
        private readonly MediaService _mediaService;

        public MediaController(MediaService mediaService)
        {
            _mediaService = mediaService;
        }

        [HttpGet("{id}")]
        public async Task<FileResult> GetMediaAsync(string id)
        {
            var media = await _mediaService.FindMediaAsync(id);
            var stream = _mediaService.GetFileStream(media);

            return new FileStreamResult(stream, media.MediaType.ToString() + "/" + media.Filetype);
        }
    }
}
