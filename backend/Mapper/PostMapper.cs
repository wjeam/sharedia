using System.Collections;
using System.Collections.Generic;
using sharedia.Dtos;
using sharedia.Models;

namespace sharedia.Mapper
{
    public abstract class PostMapper
    {
        public static PostDto ToDto(Post post)
        {
            PostDto postDto = new()
            {
                Id = post.Id,
                Title = post.Title,
                Description = post.Description,
                UserEmail = post.UserEmail,
                CreationDateTime = post.CreationDateTime,
                IsAdult = post.IsAdult,
                Dislike = post.Dislike,
                Like = post.Like,
                FileType = post.FileType,
                FileName = post.FileName,
                MediaType = post.MediaType
            };

            return postDto;
        }

        public static IEnumerable<PostDto> ToDto(IEnumerable<Post> posts)
        {
            foreach(var post in posts)
            {
                yield return ToDto(post);
            }
        }

        public static Post ToEntity(PostDto postDto)
        {
            Post post = new()
            {
                Title = postDto.Title,
                Description = postDto.Description,
                IsAdult = postDto.IsAdult,
                MediaType = postDto.MediaType,
                UserEmail = postDto.UserEmail,
                UID = postDto.UID,
                FileName = postDto.FileName,
                FileType = postDto.FileType
            };

            return post;
        }
    }
}