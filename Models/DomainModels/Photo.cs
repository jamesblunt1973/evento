using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.DomainModels
{
    public class Photo
    {
        public Photo()
        {
            Id = 0;
            EventId = 0;
            FileName = "";
            Description = "";
            Visibile = false;
        }
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        [StringLength(256)]
        public string FileName { get; set; }

        [Required]
        [StringLength(1024)]
        public string Description { get; set; }

        [Required]
        public bool Visibile { get; set; }

        // Navigation Properties
        public Event Event { get; set; }
    }
}