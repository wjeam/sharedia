using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace sharedia.Models
{
    public class Media
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("fileName")]
        public string Filename { get; set; } 
        [BsonElement("fileType")]
        public string Filetype { get; set; }
        [BsonElement("mediaType")]
        public MediaType MediaType { get ; set; }
        [BsonElement("filePath")]
        public string FilePath { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
