using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<IActionResult> GetEvents(GetEventsParameter filter)
        {
            var result = new GetEventsResult();

            // TODO: get GlobalVerification & GlobalPayment from settings
            bool globalVerification = false; // Events should verified first by admin
            bool globalPayment = false; // Events should pay specified fee

            var defaultPhoto = new Photo();

            var q = context.Events.Where(a => a.Visible && (!globalVerification || a.Verified) && (!globalPayment || a.Payed));
            // TODO: Move query to repository 
            // TODO: apply conditions
            var count = q.Count();
            var events = await q.OrderBy(a => filter.Sort).Skip(filter.Count * filter.Page).Take(filter.Count)
                .Select(a => new EventSummury()
                {
                    Capacity = a.Capacity,
                    HoldingDate = a.HoldingDate,
                    Id = a.Id,
                    Joined = a.Joined,
                    Tags = a.EventTags.Select(b => b.TagId),
                    Photo = a.Photos.DefaultIfEmpty(defaultPhoto).First().FileName,
                    Title = a.Title
                })
                .ToListAsync();

            result.TotalCount = count;
            result.Events = events;

            return Ok(result);
        }

        [HttpPost("newevent")]
        public async Task<IActionResult> NewEvent(NewEventParameter data)
        {

            // TODO: get GlobalVerification & GlobalPayment from settings
            bool globalVerification = false; // Events should verified first by admin
            bool globalPayment = false; // Events should pay specified fee

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
                UserId = data.UserId,
                Joined = 0,
                Rate = 0,
                Votes = 0,
                Payed = !globalPayment,
                Verified = !globalVerification,
                Visible = true,
                VisitCount = 0
            };

            await context.Events.AddAsync(e);
            await context.SaveChangesAsync();

            return Ok(e.Id);
        }
    }
}