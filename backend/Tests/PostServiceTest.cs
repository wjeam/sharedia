using MongoDB.Bson;
using MongoDB.Driver;
using Moq;
using sharedia.Models;
using sharedia.Services;
using System.Threading.Tasks;
using Xunit;

namespace sharedia.Tests
{
    public class PostServiceTest
    {
        private readonly PostService _postService;
        private readonly Mock<IMongoDatabase> _mongoDatabaseMock = new Mock<IMongoDatabase>();  

        public PostServiceTest()
        {
            _postService = new PostService(_mongoDatabaseMock.Object);
        }

        [Fact]
        public async Task GetPostAsync_Should_When()
        {
            // Arrange


            // Act


            // Assert

        }
    }
}
