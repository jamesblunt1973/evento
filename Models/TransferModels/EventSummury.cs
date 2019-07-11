using System;
using System.Collections.Generic;

namespace ServerApi.Models.TransferModels
{
    public class EventSummury
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Photo { get; set; }
        public DateTime HoldingDate { get; set; }
        public int Joined { get; set; }
        public int? Capacity { get; set; }
        public IEnumerable<int> Tags { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}