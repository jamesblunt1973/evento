using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApi.Data;
using ServerApi.Helpers.Logger;
using ServerApi.Models.DomainModels;
using ServerApi.Models.TransferModels;

namespace ServerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly UserManager<User> userManager;
        private readonly DataContext context;
        public EventController(ILogger logger, UserManager<User> userManager, DataContext context)
        {
            this.context = context;
            this.userManager = userManager;
            this.logger = logger;
        }

        [HttpPost("getevents")]
        [AllowAnonymous]
        public async Task<IActionResult> GetEvents(GetEventsParameter data)
        {
            var result = new GetEventsResult();

            // TODO: get GlobalVerification & GlobalPayment from settings
            bool globalVerification = false; // Events should verified first by admin
            bool globalPayment = false; // Events should pay specified fee

            var q = context.Events.Where(a => a.Visible && (!globalVerification || a.Verified) && (!globalPayment || a.Payed));
            // TODO: Move query to repository 

            if (data.From.HasValue || data.To.HasValue)
            {
                if (data.From.HasValue)
                {
                    q = q.Where(a => a.HoldingDate >= data.From.Value);
                }
                // If date to is specified, query should returns the events before that
                // and if not, we just select the events for the specified date (from)
                var to = data.To.HasValue ? data.To : data.From.Value.AddDays(1);
                q = q.Where(a => a.HoldingDate <= to);
            }
            else
            {
                // Do not return archived events at first
                q = q.Where(a => a.HoldingDate >= DateTime.Now);
            }

            if (!string.IsNullOrEmpty(data.Str))
                q = q.Where(a => a.Title.Contains(data.Str));

            if (data.Tags.Count > 0)
            {
                // TODO: Check generated query and execution plan
                q = q.Where(a => a.EventTags.Any(b => data.Tags.Contains(b.TagId)));
            }

            if (!string.IsNullOrEmpty(data.UserId))
            {
                q = q.Where(a => a.UserId == data.UserId);
            }

            var count = q.Count();

            switch (data.Sort)
            {
                case GetEventsSort.Latest:
                    q = q.OrderBy(a => a.HoldingDate);
                    break;
                case GetEventsSort.Popular:
                    q = q.OrderByDescending(a => a.Activities.Count);
                    break;
                case GetEventsSort.Nearest:
                    // TODO: create a database function which take a geo location as input and sort the events by distance
                    break;
                default:
                    break;
            }

            var events = await q.Skip(data.Count * data.Page).Take(data.Count)
                .Select(a => new EventSummury()
                {
                    Capacity = a.Capacity,
                    HoldingDate = a.HoldingDate,
                    Id = a.Id,
                    Joined = a.Joined,
                    Tags = a.EventTags.Select(b => b.TagId),
                    Photo = a.Photos.DefaultIfEmpty().First().FileName,
                    Title = a.Title
                }).ToListAsync();
            result.Events = events;

            result.TotalCount = count;

            return Ok(result);
        }

        [HttpPost("newevent")]
        public async Task<IActionResult> NewEvent(NewEventParameter data)
        {

            // TODO: get GlobalVerification & GlobalPayment from settings
            bool globalVerification = false; // Events should verified first by admin
            bool globalPayment = false; // Events should pay specified fee

            // authentication
            if (!User.Identity.IsAuthenticated)
                return BadRequest("User not found!");
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            // userId = userManager.GetUserId(User)
            // var user = await userManager.GetUserAsync(User); // get user from database

            // TODO: use auto mapper
            var e = new Event()
            {
                Capacity = data.Capacity,
                Description = data.Description,
                Duration = data.Duration,
                HoldingDate = data.HoldingDate,
                Latitude = data.Latitude,
                Link = data.Link,
                Longitude = data.Longitude,
                Title = data.Title,
                UserId = userId,
                Joined = 0,
                Rate = 0,
                Votes = 0,
                Payed = !globalPayment,
                Verified = !globalVerification,
                Visible = true,
                VisitCount = 0,
                EventTags = new List<EventTag>()
            };

            foreach (var tagId in data.Tags)
            {
                e.EventTags.Add(new EventTag() { TagId = tagId });
            }

            // TODO: Move to repository
            await context.Events.AddAsync(e);
            await context.SaveChangesAsync();

            return Ok(e.Id);
        }

        [HttpGet("getuserevents")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserEvents()
        {
            if (!User.Identity.IsAuthenticated)
                return BadRequest("User not found!");
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var events = await context.Events.Where(a => a.UserId == userId)
                .Select(a => new EventSummury()
                {
                    Capacity = a.Capacity,
                    HoldingDate = a.HoldingDate,
                    Id = a.Id,
                    Joined = a.Joined,
                    Tags = a.EventTags.Select(b => b.TagId),
                    Photo = a.Photos.DefaultIfEmpty().First().FileName,
                    Title = a.Title
                }).ToListAsync();
            return Ok(events);
        }
    }
}