using Evento.Models;
using ServerApi.Models.DomainModels;
using System.Collections.Generic;

namespace ServerApi.Models.TransferModels
{
    public class EventDto: BaseEvent
    {
        public string Time { get; set; }
        public int[] Tags { get; set; }
        public User Owner { get; set; }
        public double Rate { get; set; }
        public int Votes { get; set; }
        public List<Photo> Photos { get; set; }
        public int VisitCount { get; set; }
        public int Joined { get; set; }
        public int Favorite { get; set; }
        public int Followed { get; set; }
        public bool UserJoined { get; set; }
        public bool UserFavorite { get; set; }
        public bool UserFollowed { get; set; }
        public List<News> News { get; set; }
    }
}
