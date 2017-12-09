using System;
using System.Threading.Tasks;
using System.Linq;
using Moq;
using Xunit;
using HomepageCore.Controllers;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.Common.Configuration;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using HomepageCore.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using HomepageCore.Models;

namespace HomepageCore.UI.Test.Controllers
{
    public class PostControllerTest
    {
        private PostController _sut;

        private Mock<IApplicationUnitOfWork> _applicationUnitOfWorkMock;
        private Mock<IPostRepository> _postRepositoryMock;
        private Mock<IOptions<ApplicationOptions>> _applicationOptionsMock;
        private Mock<ILoggerFactory> _loggerMock;

        [Fact]
        public async Task Get_NoIdReturnsAll_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            Mapper.Initialize(config => { config.CreateMissingTypeMaps = true; });
            var posts = GetTestPosts(3);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetAllWithCategory()).Returns(Task.FromResult(posts));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get() as JsonResult;
            var jsonResult = (IEnumerable<PostModel>)result.Value;

            // assert
            Assert.Equal(3, jsonResult.Count());
        }

        private IEnumerable<Post> GetTestPosts(int postCount)
        {
            var posts = new List<Post>();
            for(var i=0; i<postCount; i++)
            {
                posts.Add(
                    new Post {
                        Id = Guid.NewGuid(),
                        Title = $"post {i}",
                        Content = "lorem ipsum blah blah",
                        Blurb = "lorem..",
                        CreatedOn = DateTime.UtcNow.AddDays(-i),
                        ModifiedOn = DateTime.UtcNow,
                        Category = new Category{
                            Id = Guid.NewGuid(),
                            Name = $"cat{i}"
                        }
                    }
                );
            }

            var rand = new Random();
            posts.OrderBy(c => rand.Next());
            return posts;
        }
    }
}