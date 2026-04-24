using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.Models
{
    public class Item
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
        [Required]
        public ItemType Type { get; set; }
        [Required]
        public int Price { get; set; }

        public bool IsPurchasable { get; set; } = true;

        [Required]
        public int HpBonus { get; set; }
        [Required]
        public int StrBonus { get; set; }
        [Required]
        public int IntBonus { get; set; }
        [Required]
        public int DefBonus { get; set; }
        [Required]
        public float HpMultiplier { get; set; } = 1.0f;
        [Required]
        public float StrMultiplier { get; set; } = 1.0f;
        [Required]
        public float IntMultiplier { get; set; } = 1.0f;
        [Required]
        public float DefMultiplier { get; set; } = 1.0f;


        // The name what we send to the frontend (like: "Sakura.png")
        [Required]
        public string ImageAsset { get; set; } = string.Empty;
    }
}