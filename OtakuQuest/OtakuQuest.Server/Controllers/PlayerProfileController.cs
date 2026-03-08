using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtakuQuest.Server.Data;
using System.Security.Claims;

namespace OtakuQuest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] //this makes this controller protected, only authenticated users can access it JWT
    public class PlayerProfileController : ControllerBase
    {
        private readonly OtakuQuestDbContext _context;

        public PlayerProfileController(OtakuQuestDbContext context)
        {
            _context = context;
        }

        [HttpGet("my-stats")]
        public IActionResult GetStats()
        {
            //check the token
            // A "User" objektumot a .NET automatikusan feltölti a token alapján!
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(userIdString == null)
            {
                return Unauthorized("User ID not found in token");
            }
            var userId = int.Parse(userIdString);

            var player = _context.Users.FirstOrDefault(u => u.Id  == userId);

            if (player == null)
            {
                return NotFound("Player not found");
            }

            return Ok(new
            {
                player.Username,
                player.Level,
                player.XP,
                player.Currency,
                player.STR,
                player.INT,
                player.DEF
            });
        }
    }
}
