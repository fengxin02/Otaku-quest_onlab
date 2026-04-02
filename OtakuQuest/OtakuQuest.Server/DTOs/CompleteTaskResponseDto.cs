using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class CompleteTaskResponseDto
    {
        [Required]
        public string Message { get; set; }
        [Required]
        public int XPReward { get; set; }
        [Required]
        public int CurrencyReward { get; set; }
        [Required]
        public int StrengthReward { get; set; }
        [Required]
        public int IntelligenceReward { get; set; }
        [Required]
        public int DefenceReward { get; set; }
        [Required]
        public int NewLevel { get; set; }
        [Required]
        public int CurrentXP { get; set; }
        [Required]
        public int XpToNextLevel { get; set; }
    }
}