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
        [BsonElement("mediaId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string MediaId { get; set; }
        [BsonElement("userId")]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
