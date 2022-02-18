using MongoDB.Bson;
using sharedia.Models;
using System;
using System.Collections.Concurrent;

namespace sharedia.Dtos
{
    public class PostDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public ConcurrentDictionary<string, byte> Like { get; set; }
        public ConcurrentDictionary<string, byte> Dislike { get; set; }
        public DateTime CreationDateTime { get; set; }
        public bool IsAdult { get; set; }
        public string UserId { get; set; }
        public string UID { get; set; }
        public string FileType { get; set; }
        public string FileName { get; set; }
        public MediaType MediaType { get; set; }
    }
}