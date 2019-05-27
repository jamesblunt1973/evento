using System.ComponentModel.DataAnnotations;

namespace ServerApi.Models.TransferModels
{
    public class RegisterParameter : LoginParameter
    {
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public bool? Gender { get; set; }
    }
}