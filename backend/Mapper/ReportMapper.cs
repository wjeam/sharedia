using System.Collections.Generic;
using System.Linq;
using sharedia.Dtos;
using sharedia.Models;

namespace sharedia.Mapper
{
    public abstract class ReportMapper
    {
        public static ReportDto ToDto(Report report)
        {
            return new ReportDto
            {
                Id = report.Id,
                PostId = report.PostId,
                ReporterEmail = report.ReporterEmail,
                ReportReason = report.ReportReason,
                ReportType = report.ReportType
            };
        }

        public static Report ToEntity(ReportDto reportDto)
        {
            return new Report
            {
                PostId = reportDto.PostId,
                ReporterEmail = reportDto.ReporterEmail,
                ReportReason = reportDto.ReportReason,
                ReportType = reportDto.ReportType
            };
        }

        public static IEnumerable<ReportDto> ToDto(IEnumerable<Report> reports)
        {
            return reports
                .Select(ToDto);
        }
    }
}