using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtakuQuest.Server.Data;
using OtakuQuest.Server.DTOs;
using OtakuQuest.Server.Models;
using BCrypt.Net;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace OtakuQuest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly OtakuQuestDbContext _context;

        public AuthController(OtakuQuestDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")] // POST /api/auth/register 
        public IActionResult Register([FromBody] RegisterDto dto)
        {
            if (_context.Users.Any(u => u.Username == dto.Username))
            {
                return BadRequest("This username is already taken");
            }
            //new user 
            var newUser = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password) // Hash the password before storing

            };

            //save to database
            _context.Users.Add(newUser);
            _context.SaveChanges();

            return Ok(new { Message = "Registration was succeed, welcome to OtakuQuest " });
        }

        [HttpPost("login")]
        public ActionResult<AuthResponseDto> Login([FromBody] LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Username == dto.Username);
            if (user == null)
            {
                return BadRequest("Invalid username or password");
            }

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            {
                return BadRequest("Invalid username or password");
            }
            // Authentication successful, create claims for the user (collect the datas what token brings)
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var configuration = HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            //finds the key from appsettings.json and creates a symmetric security key for signing the token
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
            //creates signing credentials using the security key and the HMAC SHA256 algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"],
                audience: configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(1), // token valid for 1 day
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new AuthResponseDto
            {
                Token = tokenString,
                Message = $"Welcome back: {user.Username} \nYour level is: {user.Level}"
            });
        }
    }
}
