using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace ServerApi.Models.DomainModels
{
    public class User : IdentityUser
    {
        [Required]
        [StringLength(256)]
        public string Name { get; set; }
        
        public bool? Gender { get; set; }

        // Navigation Properties
        public ICollection<Activity> Activities { get; set; }
        public ICollection<Event> Events { get; set; }
    }
}