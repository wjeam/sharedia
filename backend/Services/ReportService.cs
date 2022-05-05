using System.Threading.Tasks;
using sharedia.Models;
using sharedia.Repositories;

namespace sharedia.Services
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            _reportRepository = reportRepository;
        }

        public async Task<Report> CreateReport(Report report)
        {
            await _reportRepository.CreateAsync(report);
            return report;
        }
    }
}