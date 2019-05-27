using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ServerApi.Data;
using ServerApi.Models.DomainModels;
using ServerApi.Models.TransferModels;

namespace ServerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration configuration;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public AuthController(
            IConfiguration configuration,
            UserManager<User> userManager,
            SignInManager<User> signInManager)
        {
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.userManager = userManager;
        }

        [HttpPost("logout")]
        public async Task Logout()
        {
            await signInManager.SignOutAsync();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterParameter registerData)
        {
            var user = new User()
            {
                UserName = registerData.UserName,
                Name = registerData.Name,
                Email = registerData.Email,
                Gender = registerData.Gender
            };
            var result = await userManager.CreateAsync(user, registerData.Password);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            await signInManager.CheckPasswordSignInAsync(user, registerData.Password, false);
            return Ok(new AuthResult(user, GenerateJwtToken(user)));
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginParameter loginData)
        {
            loginData.UserName = loginData.UserName.ToLower();
            var user = await userManager.FindByNameAsync(loginData.UserName);
            if (user == null)
                //return NotFound("User not found!");
                return Unauthorized();
            var result = await signInManager.CheckPasswordSignInAsync(user, loginData.Password, false);
            if (result.Succeeded)
            {
                return Ok(new AuthResult(user, GenerateJwtToken(user)));
            }
            return Unauthorized();
        }

        [HttpPost("checkUserName")]
        public async Task<IActionResult> CheckUserName(StringParameter data)
        {
            var user = await userManager.FindByNameAsync(data.Str);
            return Ok(user == null);
        }

        [HttpPost("checkEmail")]
        public async Task<IActionResult> CheckEmail(StringParameter data)
        {
            var user = await userManager.FindByEmailAsync(data.Str);
            return Ok(user == null);
        }

        private string GenerateJwtToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Gender, user.Gender.ToString().ToLower())
            };
            var key = new SymmetricSecurityKey(Encoding.ASCII
                .GetBytes(configuration.GetSection("AppSettings:Token").Value)
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
