using Evento.Models;

namespace ServerApi.Models.TransferModels
{
    public class NewEventParameter: BaseEvent
    {
        public int[] Tags { get; set; }
    }
}
