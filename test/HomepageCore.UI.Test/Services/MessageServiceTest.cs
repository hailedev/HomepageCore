using System.Threading.Tasks;
using Moq;
using Xunit;
using HomepageCore.Controllers;
using HomepageCore.Common.Configuration;
using HomepageCore.Services;
using Microsoft.Extensions.Options;

namespace HomepageCore.UI.Test.Services
{
    public class MessageServiceTest
    {
        private EmailSender _sut;

        private Mock<IOptions<ApplicationOptions>> _applicationOptionsMock;

        [Fact]
        public async Task Get_NoIdReturnsAll_Succeeds()
        {
            // setup
            _applicationOptionsMock = new Mock<IOptions<ApplicationOptions>>();
            _sut = new EmailSender(_applicationOptionsMock.Object);

            await Task.Yield();
        }
    }
}