using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models.DomainModels
{
    public class News
    {
        public int Id { get; set; }

        [Required]
        public int EventId { get; set; }

        [Required]
        [StringLength(256)]
        public string Title { get; set; }

        [Required]
        [StringLength(4000)]
        public string Context { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public DateTime SubmitDate { get; set; }

        // Navigation Properties
        public Event Event { get; set; }
    }
}