using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace sharedia.Models
{
    public class Post
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("title")]
        public string Title { get; set; }
        [BsonElement("description")]
        public string Description { get; set; }
        [BsonElement("like")]
        public int Like { get; set; } = 0;
        [BsonElement("dislike")]
        public int Dislike { get; set; } = 0;
        [BsonElement("creationDateTime")]
        public DateTime CreationDateTime { get; set; } =  DateTime.Now;
        [BsonElement("isAdult")]
        public bool IsAdult { get; set; } = false;
        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        [BsonElement("fileName")]
        public string FileName { get; set; }
        [BsonElement("uid")]
        public string UID { get; set; }
        [BsonElement("fileId")]
        public string FileType { get; set; }
        [BsonElement("mediaType")]
        public MediaType MediaType{ get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
