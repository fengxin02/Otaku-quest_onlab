using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class CreateBossDto
    {
        [Required]
        public int Order { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        public string ImageAsset { get; set; } = string.Empty;

        [Required]
        public int MaxHp { get; set; }

        [Required]
        public int STR { get; set; }
        [Required]
        public int INT { get; set; }

        [Required]
        public int DEF { get; set; }
        [Required]
        public int RewardXP { get; set; }
        [Required]
        public int RewardCurrency { get; set; }

        public int? RewardItemId { get; set; }
    }
}
