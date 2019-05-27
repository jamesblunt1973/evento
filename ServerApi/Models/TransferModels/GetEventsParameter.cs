using System;
using System.Collections.Generic;

namespace ServerApi.Models.TransferModels
{
    public class GetEventsParameter
    {
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public DateTime? From { get; set; }
        public DateTime? To { get; set; }
        public List<int> Tags { get; set; }
        public int? OwnerId { get; set; }
        public string Str { get; set; }
        public int Page { get; set; }
        public int? Count { get; set; }
        public GetEventsSort Sort { get; set; }
    }

    public enum GetEventsSort
    {
        Latest,
        Popular,
        Nearest
    }
}