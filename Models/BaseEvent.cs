using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Evento.Models
{
    public abstract class BaseEvent
    {
        public int Id { get; set; }

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

        [StringLength(4000)]
        public string Description { get; set; }

        public int? Capacity { get; set; }

        [StringLength(1024)]
        public string Link { get; set; }
    }
}
