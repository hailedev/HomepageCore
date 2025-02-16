﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using HomepageCore.UI.Configuration;
using HomepageCore.Data.Entities;
using HomepageCore.Data.Repositories.Interfaces;
using HomepageCore.UI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using NSwag.Annotations;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace HomepageCore.Controllers.Api
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] // JWT authentication
    [Route("api/[controller]")]
    [ApiVersion("1.0")]
    public class PostController : Controller
    {
        private readonly IApplicationUnitOfWork _applicationUnitOfWork;
        private readonly ApplicationOptions _applicationOptions;
        private readonly IMapper _mapper;

        private readonly ILogger<PostController> _logger;

        public PostController(IApplicationUnitOfWork applicationUnitOfWork, IOptions<ApplicationOptions> optionsAccessor, IMapper mapper, ILogger<PostController> logger)
        {
            _applicationUnitOfWork = applicationUnitOfWork;
            _applicationOptions = optionsAccessor.Value;
            _mapper = mapper;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet("{id?}")]
        [Description("Returns all posts or a single post for a given guid")]
        [SwaggerResponse(typeof(IEnumerable<EditablePostModel>), Description = "The posts matching the query")]
        public async Task<IActionResult> Get(Guid? id = null, bool summary = false, Guid? filter = null, int page = 0, bool editable = false)
        {
            try
            {
                if (id != null)
                {
                    var allPosts = await _applicationUnitOfWork.Posts.GetWithCategory(x => x.Id == id.Value);
                    var post = allPosts?.FirstOrDefault();
                    if (post != null)
                    {
                        if (editable)
                        {
                            return Json(_mapper.Map<EditablePostModel>(post));
                        }
                        return summary ? Json(_mapper.Map<PostSummaryModel>(post)) : Json(_mapper.Map<PostModel>(post));
                    }
                }
                else
                {
                    var pageSize = _applicationOptions.PageSize;
                    var posts = await _applicationUnitOfWork.Posts.GetAllWithCategory();
                    if (filter != null)
                    {
                        posts = posts.Where(x => x.Category.Id == filter.Value);
                    }
                    posts = posts.OrderByDescending(x => x.CreatedOn);
                    if(page > 0)
                    {
                        posts = posts.Skip((page - 1) * pageSize).Take(pageSize);
                    }
                    return summary ? Json(posts.Select(x => _mapper.Map<PostSummaryModel>(x))) : Json(posts.Select(x => _mapper.Map<PostModel>(x)));
                }
                _logger.LogError($"Failed to find post with id: {id}");
                return NotFound();
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }

        [HttpPost]
        [SwaggerResponse(typeof(EditablePostModel), Description = "New or updated post with guid populated")]
        [Description("Creates or updates a new blog post")]
        public async Task<IActionResult> Post([FromBody]EditablePostModel model)
        {
            try
            {
                var post = new Post { CreatedOn = DateTime.UtcNow };
                if (model.Id != Guid.Empty)
                {
                    var posts = await _applicationUnitOfWork.Posts.GetWithCategory(x => x.Id == model.Id);
                    if(posts == null || posts.Count() == 0)
                    {
                        return NotFound();
                    }

                    post = posts.First();
                }
                var blurb = model.Blurb;
                if (string.IsNullOrEmpty(blurb))
                {
                    blurb = Regex.Replace(model.Content, "<.*?>", string.Empty);
                    blurb = blurb.Substring(0, Math.Min(blurb.Length, 160));
                }
                var category = _applicationUnitOfWork.Categories.GetAll().FirstOrDefault(x => x.Id == model.CategoryId);
                post.Title = model.Title;
                post.Blurb = blurb;
                post.Category = category;
                post.Content = model.Content;
                post.ModifiedOn = DateTime.UtcNow;
                post.Raw = model.Raw;
                post.Tags = "";

                if (model.Tags != null && !string.IsNullOrEmpty(model.Tags.Trim()))
                {
                    var tags = model.Tags.Split(',').Select(x => x.Trim());
                    post.Tags = string.Join(",", tags);
                }

                if (model.Id != Guid.Empty)
                {
                    _applicationUnitOfWork.Posts.Update(post);
                }
                else
                {
                    _applicationUnitOfWork.Posts.Add(post);
                }
                _applicationUnitOfWork.Commit();
                return Json(_mapper.Map<EditablePostModel>(post));
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }

        [HttpDelete("{id}")]
        [SwaggerResponse(typeof(Guid), Description = "The id of the post to delete")]
        [Description("Deletes a post")]
        public IActionResult Delete(Guid id)
        {
            try
            {
                var post = _applicationUnitOfWork.Posts.GetAll().FirstOrDefault(x => x.Id == id);
                if(post == null)
                {
                    return NotFound();
                }
                _applicationUnitOfWork.Posts.Delete(post);
                _applicationUnitOfWork.Commit();
                return Json(id);
            }
            catch (Exception e)
            {
                _logger.LogError($"Fatal error: {e}");
                return StatusCode(500, new { Errors = new[] { "Internal server error" } });
            }
        }
    }
}
