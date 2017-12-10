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
using System.Collections.Generic;
using HomepageCore.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using HomepageCore.Models;
using System.Linq.Expressions;
using Newtonsoft.Json;

namespace HomepageCore.UI.Test.Controllers
{
    public class CategoryControllerTest
    {
        private CategoryController _sut;

        private Mock<IApplicationUnitOfWork> _applicationUnitOfWorkMock;
        private Mock<ICategoryRepository> _categoryRepositoryMock;
        private Mock<ILoggerFactory> _loggerMock;

        public CategoryControllerTest()
        {
            Mapper.Initialize(config => { config.CreateMissingTypeMaps = true; });
        }

        [Fact]
        public void Get_NoIdReturnsAll_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();

            var categories = GetCategories(4);
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetAll()).Returns(categories.AsQueryable());

            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);
            _sut = new CategoryController(_applicationUnitOfWorkMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = _sut.Get() as JsonResult;
            var jsonResult = (IEnumerable<CategoryModel>)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal(4, jsonResult.Count());

            var order = 0;
            foreach(var category in jsonResult)
            {
                Assert.Equal($"category {order}", category.Name);
                order++;
            }
        }

        [Fact]
        public void Get_WithIdReturnsCategory_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();

            var categories = GetCategories(1);
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetById(It.IsAny<Guid>())).Returns(categories.First());

            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);
            _sut = new CategoryController(_applicationUnitOfWorkMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = _sut.Get(categories.First().Id) as JsonResult;
            var jsonResult = (CategoryModel)result.Value;

            // assert
            Assert.NotNull(jsonResult);
            Assert.Equal("category 0", jsonResult.Name);
            _categoryRepositoryMock.Verify(x => x.GetById(It.Is<Guid>(y => y == categories.First().Id)), Times.Once());
        }

        [Fact]
        public void Get_WithInvalidCategoryId_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            var loggerMock = new Mock<ILogger>();
            _loggerMock.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(loggerMock.Object);
            
            _categoryRepositoryMock = new Mock<ICategoryRepository>();
            _categoryRepositoryMock.Setup(x => x.GetById(It.IsAny<Guid>())).Returns<Category>(null);

            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            _applicationUnitOfWorkMock.Setup(x => x.Categories).Returns(_categoryRepositoryMock.Object);
            _sut = new CategoryController(_applicationUnitOfWorkMock.Object, Mapper.Instance, _loggerMock.Object);

            // action
            var result = _sut.Get(Guid.NewGuid()) as NotFoundResult;

            // assert
            Assert.Equal(404, result.StatusCode);
        }

        private IEnumerable<Category> GetCategories(int count)
        {
            var categories = new List<Category>();
            for(var i=0; i<count; i++)
            {
                categories.Add(
                    new Category {
                        Id = Guid.NewGuid(),
                        Name = $"category {i}",
                        Properties = JsonConvert.SerializeObject(new { order = i })
                    }
                );
            }

            var rand = new Random();
            categories.OrderBy(c => rand.Next());
            return categories;
        }
    }
}