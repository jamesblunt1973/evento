using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.DomainModels
{
    public class Activity
    {
        public string UserId { get; set; }
        
        public int EventId { get; set; }
        
        [Required]
        public bool Joined { get; set; }

        [Required]
        public bool Follow { get; set; }

        [Required]
        public bool Favorite { get; set; }

        // Navigation Properties
        public User User { get; set; }
        public Event Event { get; set; }
    }
}