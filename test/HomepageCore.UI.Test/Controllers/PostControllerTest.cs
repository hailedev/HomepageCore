using System.Threading.Tasks;
using Moq;
using Xunit;
using HomepageCore.Controllers;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.Common.Configuration;
using Microsoft.Extensions.Logging;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace HomepageCore.UI.Test.Controllers
{
    public class PostControllerTest
    {
        private PostController _sut;

        private Mock<IApplicationUnitOfWork> _applicationUnitOfWorkMock;
        private Mock<IOptions<ApplicationOptions>> _applicationOptionsMock;
        private Mock<IMapper> _mapperMock;
        private Mock<ILoggerFactory> _loggerMock;

        [Fact]
        public async Task Get_NoIdReturnsAll_Succeeds()
        {
            // setup
            _applicationUnitOfWorkMock = new Mock<IApplicationUnitOfWork>();
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _mapperMock = new Mock<IMapper>();
            _loggerMock = new Mock<ILoggerFactory>();
            _sut = new PostController(_applicationUnitOfWorkMock.Object, _applicationOptionsMock.Object, _mapperMock.Object, _loggerMock.Object);

            await Task.Yield();
        }
    }
}