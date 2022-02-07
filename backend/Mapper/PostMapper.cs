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
            postDto.MediaId = post.MediaId;
            postDto.UserId = post.UserId;
            postDto.CreationDateTime = post.CreationDateTime;
            postDto.IsAdult = post.IsAdult;
            postDto.Dislike = post.Dislike;
            postDto.Like = post.Like;

            return postDto;
        }

        public static Post ToEntity(PostDto postDto)
        {
            Post post = new Post();

            post.Title = postDto.Title;
            post.Description = postDto.Description;
            post.IsAdult = postDto.IsAdult;
            post.MediaId = postDto.MediaId;

            return post;
        }
    }
}
