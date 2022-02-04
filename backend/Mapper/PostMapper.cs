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
            post.Like = post.Like;
            post.Dislike = post.Dislike;
            post.CreationDateTime = post.CreationDateTime;
            postDto.Title = post.Title;
            postDto.UserId = post.UserId;
            post.IsAdult = post.IsAdult;
            post.MediaId = post.MediaId;

            return postDto;
        }

        public static Post ToEntity(PostDto postDto)
        {
            Post post = new Post();

            post.Title = postDto.Title;
            post.MediaId = postDto.MediaId;
            post.UserId = postDto.UserId;
            post.IsAdult = postDto.IsAdult;

            return post;
        }
    }
}
