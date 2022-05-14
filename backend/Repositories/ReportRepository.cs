using System.Threading.Tasks;
using MongoDB.Driver;
using sharedia.Models;

namespace sharedia.Repositories
{
    public class ReportRepository : GenericRepository<Report>, IReportRepository
    {
        public ReportRepository(IMongoDatabase database) : base(database)
        {
        }

        public async Task DeleteReportsByPostId(string postId)
        {
            await Collection.DeleteManyAsync(document => document.PostId == postId);
        }
    }
}