using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.TransferModels
{
    public class LoginParameter
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}