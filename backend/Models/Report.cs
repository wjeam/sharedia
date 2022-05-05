using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace sharedia.Models
{
    public class Report : BaseModel
    {
        [BsonElement("reportType")]
        public ReportType ReportType { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("postId")]
        public string PostId { get; set; }

        [BsonElement("reporterEmail")]
        public string ReporterEmail { get; set; }

        [BsonElement("reportReason")]
        public string ReportReason { get; set; }
    }
}