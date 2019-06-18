using System;
using System.Collections.Generic;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
    public class EventsController : ControllerBase
    {
        private readonly ILogger logger;
        private readonly UserManager<User> userManager;
        private readonly DataContext context;
        private readonly IHostingEnvironment hostingEnvironment;
        public EventsController(ILogger logger, UserManager<User> userManager, DataContext context, IHostingEnvironment hostingEnvironment)
        {
            this.context = context;
            this.userManager = userManager;
            this.logger = logger;
            this.hostingEnvironment = hostingEnvironment;
        }

        // POST api/events
        [HttpPost]
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

        // GET api/events/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvent(int id)
        {
            // authentication
            if (!User.Identity.IsAuthenticated)
                return BadRequest("User not found!");
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var e = await context.Events
                .Include("EventTags")
                .SingleOrDefaultAsync(a => a.Id == id);
            if (e.UserId != userId)
                return Unauthorized($"Event with id {id} is not yours to edit.");
            var res = new EventDto();
            // use auto mapper
            res.Id = e.Id;
            res.Capacity = e.Capacity;
            res.Description = e.Description;
            res.Duration = e.Duration;
            res.HoldingDate = e.HoldingDate.Date;
            res.Latitude = e.Latitude;
            res.Link = e.Link;
            res.Longitude = e.Longitude;
            res.Tags = e.EventTags.Select(a => a.TagId).ToArray();
            res.Time = e.HoldingDate.ToString("hh:mm tt");
            res.Title = e.Title;
            res.UserId = e.UserId;
            return Ok(res);
        }

        // GET api/events/5/photos
        [HttpGet("{id}/photos")]
        public async Task<IActionResult> GetEventPhotos(int id)
        {
            var list = await context.Photos.Where(a => a.EventId == id).OrderBy(a => a.Id).ToListAsync();
            return Ok(list);
        }

        // POST api/events/new
        [HttpPost("new")]
        public async Task<IActionResult> NewEvent(EventDto data)
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

            var ts = DateTime.ParseExact(data.Time, "hh:mm tt", CultureInfo.InvariantCulture).TimeOfDay;
            // TODO: use auto mapper
            var e = new Event()
            {
                Capacity = data.Capacity,
                Description = data.Description,
                Duration = data.Duration,
                HoldingDate = data.HoldingDate.Add(ts),
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

        [HttpGet("userEvents")]
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

        [HttpPost("upload"), DisableRequestSizeLimit]
        public IActionResult Upload()
        {
            var fileNames = new List<string>();
            string folderName = "assets\\temp\\";
            string webRootPath = hostingEnvironment.WebRootPath;
            string newPath = Path.Combine(webRootPath, folderName);
            if (!Directory.Exists(newPath))
            {
                Directory.CreateDirectory(newPath);
            }
            foreach (var file in Request.Form.Files)
            {
                if (file.Length > 0)
                {
                    var ext = Path.GetExtension(file.Name);
                    ext = Path.GetExtension(file.FileName);
                    //string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fileName = DateTime.Now.Ticks + ext;
                    using (var stream = new FileStream(newPath + fileName, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        var img = Image.FromStream(stream);
                        var w = 300;
                        var h = Convert.ToInt32(w * 1.0 / img.Width * img.Height);
                        if (h > w)
                        {
                            h = 300;
                            w = Convert.ToInt32(h * 1.0 / img.Height * img.Width);
                        }
                        var bmp = new Bitmap(img, w, h);
                        bmp.Save(newPath + "_" + fileName);
                        bmp.Dispose();
                        img.Dispose();
                    }
                    fileNames.Add(fileName);
                }
            }
            return Ok(fileNames);
        }
    
        [HttpPost("newFiles")]
        public async Task<IActionResult> EventNewFiles(NewFilesDto data) 
        {
            string webRootPath = hostingEnvironment.WebRootPath;
            var itemPath = Path.Combine(webRootPath, "assets\\files\\events\\" + data.Id + "\\");
            Directory.CreateDirectory(itemPath);
            var tempPath = Path.Combine(webRootPath, "assets\\temp\\");
            foreach (var file in data.Files)
            {
                System.IO.File.Move(tempPath + file, itemPath + file);
                System.IO.File.Move(tempPath + "_" + file, itemPath + "_" + file);
            }
        }
    }
}