using System;

namespace sharedia.Dtos
{
    public class ThreadDto
    {
        public string Id { get; set; }

        public string Content { get; set; }

        public string UserEmail { get; set; }

        public string ParentId { get; set; }

        public DateTime CreationDateTime { get; set; } =  DateTime.Now;
    }
}