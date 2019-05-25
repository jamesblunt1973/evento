using System;
using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.TransferModels
{
    public class NewEventParameter
    {
        [Required]
        public string UserId { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        [Required]
        public virtual DateTime HoldingDate { get; set; }

        public int? Duration { get; set; }

        [Required]
        [StringLength(4000)]
        public string Description { get; set; }

        public int? Capacity { get; set; }

        [Required]
        [StringLength(1024)]
        public string Link { get; set; }
    }
}
