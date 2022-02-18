using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;

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
        public ConcurrentDictionary<string, byte> Like { get; set; } = new();
        [BsonElement("dislike")]
        public ConcurrentDictionary<string, byte> Dislike { get; set; } = new();
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