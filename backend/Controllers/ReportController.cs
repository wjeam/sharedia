using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sharedia.Services;
using sharedia.Attributes;
using sharedia.Dtos;
using sharedia.Mapper;

namespace sharedia.Controllers
{
    [ApiController]
    [Route("report")]
    [ApiKeyAuthorization]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] ReportDto reportDto)
        {
            var report = ReportMapper.ToEntity(reportDto);

            await _reportService.CreateReport(report);

            return Created($"report/{report.Id}", report);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _reportService.GetAll();

            return Ok(ReportMapper.ToDto(reports));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(string id)
        {
            await _reportService.DeleteReport(id);

            return NoContent();
        }
    }
}