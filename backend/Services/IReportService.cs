using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Services
{
    public interface IReportService
    {
        Task<Report> CreateReport(Report report);

        Task<IEnumerable<Report>> GetAll();

        Task DeleteReport(string id);
    }
}