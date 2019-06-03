using ServerApi.Models.DomainModels;

namespace ServerApi.Models.TransferModels
{
    public class AuthResult
    {
        public AuthResult(User user, string token)
        {
            this.Id = user.Id;
            this.Name = user.Name;
            this.Email = user.Email;
            this.Gender = user.Gender;
            this.Token = token;
        }
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool? Gender { get; set; }
    }
}