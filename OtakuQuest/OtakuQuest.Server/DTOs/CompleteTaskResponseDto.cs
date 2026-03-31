namespace OtakuQuest.Server.DTOs
{
    public class CompleteTaskResponseDto
    {
        public string Message { get; set; }
        public int XPReward { get; set; }
        public int CurrencyReward { get; set; }
        public int StrengthReward { get; set; }
        public int IntelligenceReward { get; set; }
        public int DefenceReward { get; set; }
        public int NewLevel { get; set; }
        public int CurrentXP { get; set; }
        public int XpToNextLevel { get; set; }
    }
}