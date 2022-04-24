using MongoDB.Bson;
using sharedia.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace sharedia.Dtos
{
    public class PostDto
    {
        public string Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public HashSet<string> Like { get; set; }

        public HashSet<string> Dislike { get; set; }

        public DateTime CreationDateTime { get; set; }

        public bool IsAdult { get; set; }

        public string UserEmail { get; set; }

        public IFormFile File { get; set; }

        public string UID { get; set; }

        public string FileType { get; set; }

        public string FileName { get; set; }

        public MediaType MediaType { get; set; }
    }
}