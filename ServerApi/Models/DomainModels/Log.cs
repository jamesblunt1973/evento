using System;
using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.DomainModels
{
    public class Log
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [Required]
        public int EventId { get; set; }
        [Required]
        public int LogLevel { get; set; }
        [Required]
        public DateTime EventDate { get; set; }
        [Required]
        [StringLength(4000)]
        public string Message { get; set; }
        // Navigation properties
        public User User { get; set; }
    }
}