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

        public int HpBonus { get; set; }
        public int StrBonus { get; set; }
        public int IntBonus { get; set; }
        public int DefBonus { get; set; }

        public float HpMultiplier { get; set; } = 1.0f;
        public float StrMultiplier { get; set; } = 1.0f;
        public float IntMultiplier { get; set; } = 1.0f;
        public float DefMultiplier { get; set; } = 1.0f;


        // The name what we send to the frontend (like: "Sakura.png")
        [Required]
        public string ImageAsset { get; set; } = string.Empty;
    }
}