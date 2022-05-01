using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace sharedia.Models
{
    public class Thread : BaseModel
    {
        [BsonElement("content")]
        public string Content { get; set; }

        [BsonElement("userEmail")]
        public string UserEmail { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement("parentId")]
        public string ParentId { get; set; }

        [BsonElement("like")]
        public HashSet<string> Like { get; set; } = new();

        [BsonElement("dislike")]
        public HashSet<string> Dislike { get; set; } = new();

        [BsonElement("creationDateTime")]
        public DateTime CreationDateTime { get; set; } =  DateTime.Now;
    }
}