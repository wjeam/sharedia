using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IReportService
    {
        Task<Report> CreateReport(Report report);
    }
}