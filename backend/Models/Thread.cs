using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace sharedia.Models
{
    public class Thread
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("content")]
        public string Content { get; set; }

        [BsonElement("userEmail")]
        public string UserEmail { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("parentId")]
        public string ParentId { get; set; }

        [BsonElement("creationDateTime")]
        public DateTime CreationDateTime { get; set; } =  DateTime.Now;
    }
}