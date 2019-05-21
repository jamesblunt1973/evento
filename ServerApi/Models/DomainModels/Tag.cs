using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.DomainModels
{
    public class Tag
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        // Navigation Properties
        public ICollection<EventTag> EventTags { get; set; }
    }
}