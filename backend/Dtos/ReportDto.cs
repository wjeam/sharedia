using sharedia.Models;

namespace sharedia.Dtos
{
    public class ReportDto : BaseModelDto
    {
        public ReportType ReportType { get; set; }

        public string PostId { get; set; }

        public string ReporterEmail { get; set; }

        public string ReportReason { get; set; }
    }
}