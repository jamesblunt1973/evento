using Evento.Models;

namespace ServerApi.Models.TransferModels
{
    public class EventDto: BaseEvent
    {
        public string Time { get; set; }
        public int[] Tags { get; set; }
    }
}
