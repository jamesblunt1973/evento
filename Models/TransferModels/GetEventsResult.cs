using System.Collections.Generic;
using ServerApi.Models.DomainModels;

namespace ServerApi.Models.TransferModels
{
    public class GetEventsResult
    {
        public int TotalCount { get; set; }
        public List<EventSummury> Events { get; set; }
    }
}