using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models.DomainModels
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime HoldingDate { get; set; }

        public int? Duration { get; set; }

        [Required]
        [StringLength(4096)]
        public string Description { get; set; }

        public int? Capacity { get; set; }

        [Required]
        public int Joined{get;set;}

        [Required]
        public int VisitCount { get; set; }

        [Required]
        public double Rate { get; set; }

        [Required]
        public int Votes { get; set; }

        [Required]
        public bool Visibility { get; set; }

        [Required]
        public bool Verified { get; set; }

        [Required]
        public bool Payed { get; set; }

        [Required]
        public string Link { get; set; }

        public ICollection<Photo> Photos{get; set;}
    }
}