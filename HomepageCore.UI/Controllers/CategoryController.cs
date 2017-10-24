using System;
using System.Linq;
using AutoMapper;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HomepageCore.Controllers
{
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class CategoryController : Controller
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public CategoryController(IApplicationUnitOfWork applicationUnitOfWork, IMapper mapper, ILoggerFactory loggerFactory)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
            _mapper = mapper;
            _logger = loggerFactory.CreateLogger(GetType().Namespace);
        }

        [HttpGet("{id?}")]
        public IActionResult Get(Guid? id = null)
        {
            try
            {
                if (id == null)
                {
                    var result =
                        _applicationUnitOfWork.Categories.GetAll()
                            .OrderBy(x => JsonConvert.DeserializeObject<JObject>(x.Properties)["order"])
                            .Select(x => _mapper.Map<CategoryModel>(x));

                    return Json(result);
                }
                var category = _applicationUnitOfWork.Categories.GetById(id.Value);
                if (category != null)
                {
                    return Json(_mapper.Map<CategoryModel>(category));
                }
                _logger.LogError($"Failed to find category with id: {id}");
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }
    }
}
