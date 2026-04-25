using OtakuQuest.Server.Models;

namespace OtakuQuest.Server.DTOs
{
    public class CurrentBossResponseDto
    {
        public Boss Boss { get; set; } = null!;
        public int CurrentHp { get; set; }
    }
}