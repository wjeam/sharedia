using MongoDB.Bson;
using System;

namespace sharedia.Dtos
{
    public class PostDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Like { get; set; }
        public int Dislike { get; set; }
        public DateTime CreationDateTime { get; set; }
        public bool IsAdult { get; set; }
        public string MediaId { get; set; }
        public string UserId { get; set; }
    }
}
