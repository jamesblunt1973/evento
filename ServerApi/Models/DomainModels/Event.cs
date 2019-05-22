using ServerApi.Models.TransferModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerApi.Models.DomainModels
{
    public class Event: BaseEventData
    {
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "smalldatetime")]
        public override DateTime HoldingDate { get; set; }

        [Required]
        public int Joined { get; set; }

        [Required]
        public int VisitCount { get; set; }

        [Required]
        public double Rate { get; set; }

        [Required]
        public int Votes { get; set; }

        /// <summary>
        /// Visiblity of event controlled by owner
        /// </summary>
        [Required]
        public bool Visible { get; set; }

        /// <summary>
        /// Visiblity of event controlled by admin
        /// </summary>
       [Required]
        public bool Verified { get; set; }

        [Required]
        public bool Payed { get; set; }

        // Navigation Properties
        public ICollection<Activity> Activities { get; set; }
        public ICollection<EventTag> EventTags { get; set; }
        public ICollection<News> News { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public User User { get; set; }
    }
}