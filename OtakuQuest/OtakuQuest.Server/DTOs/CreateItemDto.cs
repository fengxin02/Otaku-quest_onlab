using System.ComponentModel.DataAnnotations;
using OtakuQuest.Server.Models;

namespace OtakuQuest.Server.DTOs
{
    public class CreateItemDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public ItemType Type { get; set; } // 0 = Weapon, 1 = Avatar, 2 = Background

        [Required]
        public int Price { get; set; }
        [Required]
        public bool IsPurchasable { get; set; } = true;

        [Required]
        public string ImageAsset { get; set; } = string.Empty;

        public int HpBonus { get; set; } = 0;
        public int StrBonus { get; set; } = 0;
        public int IntBonus { get; set; } = 0;
        public int DefBonus { get; set; } = 0;

        public float HpMultiplier { get; set; } = 1.0f;
        public float StrMultiplier { get; set; } = 1.0f;
        public float IntMultiplier { get; set; } = 1.0f;
        public float DefMultiplier { get; set; } = 1.0f;
    }
}