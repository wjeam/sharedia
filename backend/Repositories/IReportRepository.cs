using System.Threading.Tasks;
using sharedia.Models;

namespace sharedia.Repositories
{
    public interface IReportRepository :IGenericRepository<Report>
    {
        public Task DeleteReportsByPostId(string postId);
    }
}