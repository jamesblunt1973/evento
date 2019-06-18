using Evento.Models;

namespace ServerApi.Models.TransferModels
{
    public class NewFilesDto
    {
        public int Id { get; set; }
        public string[] Files { get; set; }
    }
}
