using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
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
        [BsonElement("like")]
        public int Like { get; set; } = 0;
        [BsonElement("dislike")]
        public int Dislike { get; set; } = 0;
        [BsonElement("creationDateTime")]
        public DateTime CreationDateTime { get; set; } =  DateTime.Now;
        [BsonElement("isAdult")]
        public bool IsAdult { get; set; } = false;
        [BsonElement("mediaId")]
        public string MediaId { get; set; }
        [BsonElement("userId")]
        public string UserId { get; set; }
    }
}
