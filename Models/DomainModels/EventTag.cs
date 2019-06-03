using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.DomainModels
{
    public class EventTag
    {
        public int EventId { get; set; }
        
        public int TagId { get; set; }

        // Navigation Properties
        public Event Event { get; set; }
        public Tag Tag { get; set; }
    }
}