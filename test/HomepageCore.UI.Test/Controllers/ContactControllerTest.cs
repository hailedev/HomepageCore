using System;
using System.Threading.Tasks;
using System.Linq;
using Moq;
using Xunit;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq.Expressions;
using HomepageCore.Controllers;
using HomepageCore.Services.Interfaces;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.Models;
using Newtonsoft.Json;

namespace HomepageCore.UI.Test.Controllers
{
    public class ContactControllerTest
    {
        private ContactController _sut;

        private Mock<IEmailSender> _emailSenderMock;
        private Mock<ILoggerFactory> _loggerMock;

        [Fact]
        public void Post_Message_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            _emailSenderMock = new Mock<IEmailSender>();
            _emailSenderMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).Returns(Task.FromResult(true));
            _sut = new ContactController(_emailSenderMock.Object, _loggerMock.Object);
            var model = new ContactModel {
                Email = "test@test.com",
                Name = "vegeta",
                Message = "blah blah"
            };
            
            // action
            var result = _sut.Post(model) as JsonResult;
            var jsonResult = (dynamic)result.Value;

            // assert
            Assert.Equal(true, jsonResult.ToString().ToLower().Contains("true"));
        }

        [Fact]
        public void Post_ExceptionReturnsInternalError_Succeeds()
        {
            // setup
            _loggerMock = new Mock<ILoggerFactory>();
            var loggerMock = new Mock<ILogger>();
            _loggerMock.Setup(x => x.CreateLogger(It.IsAny<string>())).Returns(loggerMock.Object);
            
            _emailSenderMock = new Mock<IEmailSender>();
            _emailSenderMock
                .Setup(x => x.SendEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
                .Callback<string, string, string, string>((s1, s2, s3, s4) => throw new Exception());

            _sut = new ContactController(_emailSenderMock.Object, _loggerMock.Object);
            var model = new ContactModel {
                Email = "test@test.com",
                Name = "vegeta",
                Message = "blah blah"
            };
            
            // action
            var result = _sut.Post(model) as ObjectResult;

            // assert
            Assert.Equal(500, result.StatusCode);
        }
    }
}