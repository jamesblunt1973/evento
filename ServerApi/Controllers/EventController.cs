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

        [HttpPost("GetEvents")]
        public async Task<IActionResult> GetEvents([FromForm]GetEventsFilter filter)
        {
            var result = new GetEventsResult();

            // TODO: get GlobalVerification & GlobalPayment from settings
            bool globalVerification = false; // Events should verified first by admin
            bool globalPayment = false; // Events should pay specified fee

            var q = context.Events.Where(a => a.Visible && (!globalVerification || a.Verified) && (!globalPayment || a.Payed));
            // TODO: Move query to repository 
            // TODO: apply conditions
            var events = await q.ToListAsync();
            var count = q.Count();

            result.TotalCount = count;
            result.Events = events;

            return Ok(result);
        }

        [HttpPost("NewEvent")]
        public async Task<IActionResult> NewEvent([FromForm]BaseEventData data)
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
            return Ok();
        }
    }
}