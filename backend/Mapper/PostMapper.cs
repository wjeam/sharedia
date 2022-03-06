using sharedia.Dtos;
using sharedia.Models;

namespace sharedia.Mapper
{
    public class PostMapper
    {
        public static PostDto ToDto(Post post)
        {
            PostDto postDto = new PostDto();

            postDto.Id = post.Id;
            postDto.Title = post.Title;
            postDto.Description = post.Description;
            postDto.UserEmail = post.UserEmail;
            postDto.CreationDateTime = post.CreationDateTime;
            postDto.IsAdult = post.IsAdult;
            postDto.Dislike = post.Dislike;
            postDto.Like = post.Like;
            postDto.UID = post.UID;
            postDto.FileType = post.FileType;
            postDto.FileName = post.FileName;
            postDto.MediaType = post.MediaType;

            return postDto;
        }

        public static Post ToEntity(PostDto postDto)
        {
            Post post = new Post();

            post.Title = postDto.Title;
            post.Description = postDto.Description;
            post.IsAdult = postDto.IsAdult;
            post.MediaType = postDto.MediaType;
            post.UserEmail = postDto.UserEmail;
            post.UID = postDto.UID;
            post.FileName = postDto.FileName;
            post.FileType = postDto.FileType;

            return post;
        }
    }
}