using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OtakuQuest.Server.Data;
using OtakuQuest.Server.DTOs;
using OtakuQuest.Server.Models;
using System.Security.Claims;

namespace OtakuQuest.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly OtakuQuestDbContext _context;

        public ItemController(OtakuQuestDbContext context)
        {
            _context = context;
        }
        [HttpGet("shop")]
        public async Task<ActionResult<List<Item>>> GetShopItems()
        {
            var items = await _context.Items.ToListAsync();
            return Ok(items);
        }

        [HttpPost("buy")]
        public async Task<IActionResult> BuyItem([FromBody] BuyItemDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var player = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

            if (player == null)
            {
                return NotFound("Player not found");
            }

            var itemToBuy = await _context.Items.FirstOrDefaultAsync(i => i.Id == dto.ItemId);
            if (itemToBuy == null)
            {
                return NotFound("Item not found");
            }
            bool alreadyOwns = await _context.UserItems
                .AnyAsync(ui => ui.UserId == userId && ui.ItemId == dto.ItemId);
            if (alreadyOwns)
            {
                return BadRequest("You already own this item!");
            }

            if (player.Currency < itemToBuy.Price)
            {
                return BadRequest("Not enough currency!");
            }

            player.Currency -= itemToBuy.Price;

            _context.UserItems.Add(new UserItem
            {
                UserId = player.Id,
                ItemId = itemToBuy.Id
            });

            await _context.SaveChangesAsync();
            return Ok(new { Message = $"Successfully purchased {itemToBuy.Name}!" });
        }

        [HttpPost("equip")]
        public async Task<IActionResult> EquipItem([FromBody] EquipItemDto dto)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var player = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (player == null)
            {
                return NotFound("Player not found");
            }

            var itemExist = await _context.Items.FirstOrDefaultAsync(i => i.Id == dto.ItemId);
            if (itemExist == null)
            {
                return NotFound("Item not found");
            }
            var userItem = await _context.UserItems
                .Include(ui => ui.Item)
                .FirstOrDefaultAsync(ui => ui.UserId == userId && ui.ItemId == dto.ItemId);
            if (userItem == null)
            {
                return BadRequest("You don't own this item!");
            }
            var itemToEquip = userItem.Item;
            switch (itemToEquip.Type)
            {
                case ItemType.Weapon:
                    player.EquippedWeaponId = itemToEquip.Id;
                    break;
                case ItemType.Character:
                    player.EquippedAvatarId = itemToEquip.Id;
                    break;
                case ItemType.Background:
                    player.EquippedBackgroundId = itemToEquip.Id;
                    break;
                default:
                    return BadRequest("Invalid item type!");
            }
            await _context.SaveChangesAsync();
            return Ok(new { Message = $"Successfully equipped {itemToEquip.Name}!" });

        }

        [HttpGet("inventory")]
        public async Task<ActionResult<List<Item>>> GetMyInventory()
        {

            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var player = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if (player == null)
            {
                return NotFound("Player not found");
            }

            var myItems = await _context.UserItems
                .Where(ui => ui.UserId == userId)
                .Select(ui => ui.Item) 
                .ToListAsync();

            return Ok(myItems);
        }
        [HttpPost("create")]
        // Opcionális: Ha az egész controlleren ott van fent az [Authorize], 
        // de te ezt könnyen akarod tesztelni token nélkül is Swaggerből, 
        // akkor vedd ki a kommentből az alábbi sort:
        // [AllowAnonymous] 
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto dto)
        {
            var newItem = new Item
            {
                Name = dto.Name,
                Description = dto.Description,
                Type = dto.Type,
                Price = dto.Price,
                ImageAsset = dto.ImageAsset,
                HpBonus = dto.HpBonus,
                StrBonus = dto.StrBonus,
                IntBonus = dto.IntBonus,
                DefBonus = dto.DefBonus,
                HpMultiplier = dto.HpMultiplier,
                StrMultiplier = dto.StrMultiplier,
                IntMultiplier = dto.IntMultiplier,
                DefMultiplier = dto.DefMultiplier
            };

            _context.Items.Add(newItem);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = $"Sikeresen létrehoztad a tárgyat: {newItem.Name}",
                Item = newItem
            });
        }
    }
}

