using sharedia.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace sharedia.Dtos
{
    public class PostDto : BaseModelDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Description { get; set; }

        public HashSet<string> Like { get; set; }

        public HashSet<string> Dislike { get; set; }

        public DateTime CreationDateTime { get; set; }

        public bool IsAdult { get; set; }

        [Required]
        public string UserEmail { get; set; }

        [Required]
        public IFormFile File { get; set; }

        public string UID { get; set; }

        [Required]
        public string FileType { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public MediaType MediaType { get; set; }
    }
}