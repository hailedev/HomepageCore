using System;
using System.Threading.Tasks;
using System.Linq;
using Moq;
using Xunit;
using HomepageCore.Controllers.Api;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.UI.Configuration;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using HomepageCore.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using HomepageCore.UI.Models;
using System.Linq.Expressions;

namespace HomepageCore.UI.Test.Controllers
{
    public class PostControllerTest
    {
        private PostController _sut;

        private Mock<IApplicationUnitOfWork> _applicationUnitOfWorkMock;
        private Mock<IPostRepository> _postRepositoryMock;
        private Mock<ICategoryRepository> _categoryRepositoryMock;
        private Mock<IOptions<ApplicationOptions>> _applicationOptionsMock;
        private Mock<ILoggerFactory> _loggerMock;

        public PostControllerTest()
        {
            Mapper.Initialize(config => { config.CreateMissingTypeMaps = true; });
        }

        [Fact]
        public async Task Get_NoIdReturnsAll_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
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
            Assert.NotNull(jsonResult);
            Assert.Equal(3, jsonResult.Count());
        }

        [Fact]
        public async Task Get_WithSummaryReturnsPostSummaries_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            var posts = GetTestPosts(5);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetAllWithCategory()).Returns(Task.FromResult(posts));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get(null, true) as JsonResult;
            var jsonResult = (IEnumerable<PostSummaryModel>)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(5, jsonResult.Count());
        }

        [Fact]
        public async Task Get_WithPageReturnsPaged_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            var posts = GetTestPosts(6);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetAllWithCategory()).Returns(Task.FromResult(posts));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get(null, false, null, 2) as JsonResult;
            var jsonResult = (IEnumerable<PostModel>)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(1, jsonResult.Count());
            Assert.Equal("post 5", jsonResult.First().Title);
        }
        
        [Fact]
        public async Task Get_WithPageGreaterThanRange_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            var posts = GetTestPosts(6);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetAllWithCategory()).Returns(Task.FromResult(posts));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get(null, false, null, 3) as JsonResult;
            var jsonResult = (IEnumerable<PostModel>)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(0, jsonResult.Count());
        }

        [Fact]
        public async Task Get_WithCategoryFilterReturnsFilteredPosts_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            var posts = GetTestPosts(5, true);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetAllWithCategory()).Returns(Task.FromResult(posts));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);
            var post = posts.First();

            // action
            var result = await _sut.Get(null, false, post.Category.Id) as JsonResult;
            var jsonResult = (IEnumerable<PostModel>)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(2, jsonResult.Count());
            Assert.Equal(post.Category.Id, jsonResult.First().CategoryId);
            Assert.Equal(post.Category.Id, jsonResult.Last().CategoryId);
        }

        [Fact]
        public async Task Get_WithIdReturnsPost_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            var posts = GetTestPosts(5);
            IEnumerable<Post> post = new List<Post>{posts.Last()};
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult(post));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get(post.First().Id) as JsonResult;
            var jsonResult = (PostModel)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(post.First().Id, jsonResult.Id);
        }

        [Fact]
        public async Task Get_WithInvalidPostId_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            var loggerMock = new Mock<ILogger>();
            _loggerMock.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(loggerMock.Object);
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult<IEnumerable<Post>>(null));
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationOptionsMock.Setup(x => x.Value).Returns(new ApplicationOptions{PageSize = 5});
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = await _sut.Get(Guid.NewGuid()) as NotFoundResult;

            // assert
            Assert.Equal(404, result.StatusCode);
        }

        [Fact]
        public async Task Post_CreateNewPost_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();

            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult<IEnumerable<Post>>(null));
            _postRepositoryMock.Setup(x => x.Add(It.IsAny<Post>())).Callback<Post>(p => { p.Id = Guid.NewGuid(); });

            var category = new Category{ Id = Guid.NewGuid(), Name = "cat" };

            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetAll()).Returns((new List<Category> { category }).AsQueryable());

            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);

            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);
            var model = new EditablePostModel
            {
                Title = "test1",
                Blurb = "lorem...",
                CategoryId = category.Id,
                Content = "lorem ipsum blah blah"
            };

            // action
            var result = await _sut.Post(model) as JsonResult;
            var jsonResult = (EditablePostModel)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(model.Title, jsonResult.Title);
            _postRepositoryMock.Verify(x => x.Add(It.IsAny<Post>()), Times.Once());
        }

        [Fact]
        public async Task Post_UpdatePost_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();

            var posts = GetTestPosts(1);
            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult(posts));
            _postRepositoryMock.Setup(x => x.Add(It.IsAny<Post>())).Callback<Post>(p => { p.Id = Guid.NewGuid(); });

            var category = new Category{ Id = Guid.NewGuid(), Name = "cat" };

            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetAll()).Returns((new List<Category> { category }).AsQueryable());

            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);

            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);
            var model = new EditablePostModel
            {
                Id = posts.First().Id,
                Title = "test1",
                Blurb = "lorem...",
                CategoryId = category.Id,
                Content = "lorem ipsum blah blah"
            };

            // action
            var result = await _sut.Post(model) as JsonResult;
            var jsonResult = (EditablePostModel)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(model.Title, jsonResult.Title);
            _postRepositoryMock.Verify(x => x.Update(It.IsAny<Post>()), Times.Once());
            _postRepositoryMock.Verify(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>()), Times.Once());
        }

        [Fact]
        public async Task Post_UpdateInvalidPost_Fails()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();

            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult<IEnumerable<Post>>(null));
            _postRepositoryMock.Setup(x => x.Add(It.IsAny<Post>())).Callback<Post>(p => { p.Id = Guid.NewGuid(); });

            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);

            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);
            var category = new Category{ Id = Guid.NewGuid(), Name = "cat" };
            var model = new EditablePostModel
            {
                Id = Guid.NewGuid(),
                Title = "test1",
                Blurb = "lorem...",
                CategoryId = category.Id,
                Content = "lorem ipsum blah blah"
            };

            // action
            var result = await _sut.Post(model) as NotFoundResult;

            // assert
            Assert.Equal(404, result.StatusCode);
            _postRepositoryMock.Verify(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>()), Times.Once());
        }

        [Fact]
        public async Task Post_PostBlurbCharacterRestricted_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();

            _postRepositoryMock = new Mock<IPostRepository>();
            _postRepositoryMock.Setup(x => x.GetWithCategory(It.IsAny<Expression<Func<Post, bool>>>())).Returns(Task.FromResult<IEnumerable<Post>>(null));
            _postRepositoryMock.Setup(x => x.Add(It.IsAny<Post>())).Callback<Post>(p => { p.Id = Guid.NewGuid(); });

            var category = new Category{ Id = Guid.NewGuid(), Name = "cat" };

            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetAll()).Returns((new List<Category> { category }).AsQueryable());

            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _applicationUnitOfWorkMock.Setup(x => x.Posts).Returns(_postRepositoryMock.Object);
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);

            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, Mapper.Instance, _loggerMock.Object);
            var model = new EditablePostModel
            {
                Title = "test1",
                CategoryId = category.Id,
                Content = "Lorem ipsum dolor amet banh mi art party church-key bitters, vinyl pabst jean shorts echo park farm-to-table mixtape. Tumeric meditation umami pok pok raw denim. Aesthetic drinking vinegar iPhone"
            };

            // action
            var result = await _sut.Post(model) as JsonResult;
            var jsonResult = (EditablePostModel)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(160, jsonResult.Blurb.Length);
        }

        private IEnumerable<Post> GetTestPosts(int postCount, bool filtered = false)
        {
            var posts = new List<Post>();
            for(var i=0; i<postCount; i++)
            {
                var category = new Category
                {
                    Id = Guid.NewGuid(),
                    Name = $"cat{i}"
                };

                if(i%2 == 1 && filtered)
                {
                    category = posts.Last().Category;
                }
                posts.Add(
                    new Post {
                        Id = Guid.NewGuid(),
                        Title = $"post {i}",
                        Content = "lorem ipsum blah blah",
                        Blurb = "lorem..",
                        CreatedOn = DateTime.UtcNow.AddDays(-i),
                        ModifiedOn = DateTime.UtcNow,
                        Category = category
                    }
                );
            }

            var rand = new Random();
            posts.OrderBy(c => rand.Next());
            return posts;
        }
    }
}