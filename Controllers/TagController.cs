using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApi.Data;
using ServerApi.Helpers.Logger;
using ServerApi.Models.DomainModels;

namespace ServerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly DataContext context;
        public TagsController(ILogger logger, DataContext context)
        {
            this.context = context;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            var tags = await context.Tags.ToListAsync<Tag>();
            return Ok(tags);
        }

        [HttpPost]
        public async Task<IActionResult> NewTag(Tag tag)
        {
            await context.Tags.AddAsync(tag);
            await context.SaveChangesAsync();

            return Ok(tag.Id);
        }
    }
}