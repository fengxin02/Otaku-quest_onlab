using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class PlayerStatsDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public int Level { get; set; }
        [Required]
        public int XP { get; set; }
        [Required]
        public int Currency { get; set; }
        [Required]
        public int STR { get; set; }
        [Required]
        public int INT { get; set; }
        [Required]
        public int DEF { get; set; }
        [Required]
        public int CurrentHP { get; set; }
        [Required]
        public int MaxHP { get; set; }

        public string? AvatarImage { get; set; }
        public string? BackgroundImage { get; set; }
        public string? WeaponImage { get; set; }

        public string? WeaponName { get; set; }
    }
}