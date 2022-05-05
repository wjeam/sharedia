using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(IMongoDatabase database) : base(database)
        {
        }
    }
}