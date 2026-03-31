using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OtakuQuest.Server.Data;
using OtakuQuest.Server.DTOs;
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
        public ActionResult<PlayerStatsDto> GetStats()
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

            var statsDto = new PlayerStatsDto
            {
                Username = player.Username,
                Level = player.Level,
                XP = player.XP,
                Currency = player.Currency,
                STR = player.STR,
                INT = player.INT,
                DEF = player.DEF,
                CurrentHP = player.CurrentHP,
                MaxHP = player.MaxHP,
                AvatarItemId = player.AvatarItemId
            };

            return Ok(statsDto);
        }
    }
}
