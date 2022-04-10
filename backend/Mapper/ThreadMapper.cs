using System.Collections.Generic;
using MongoDB.Bson;
using sharedia.Dtos;
using sharedia.Models;

namespace sharedia.Mapper
{
    public class ThreadMapper
    {
        public static ThreadDto ToDto(Thread thread)
        {
            ThreadDto threadDto = new()
            {
                Id = thread.Id,
                Content = thread.Content,
                ParentId = thread.ParentId,
                UserEmail = thread.UserEmail,
                CreationDateTime = thread.CreationDateTime
            };

            return threadDto;
        }

        public static IEnumerable<ThreadDto> ToDto(IEnumerable<Thread> threads)
        {
            foreach(var thread in threads)
            {
                yield return ToDto(thread);
            }
        }

        public static Thread ToEntity(ThreadDto threadDto)
        {
            Thread thread = new()
            {
                Id = ObjectId.GenerateNewId().ToString(),
                Content = threadDto.Content,
                ParentId = threadDto.ParentId,
                UserEmail = threadDto.UserEmail,
            };

            return thread;
        }
    }
}