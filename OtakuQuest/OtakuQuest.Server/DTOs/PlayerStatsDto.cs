namespace OtakuQuest.Server.DTOs
{
    public class PlayerStatsDto
    {
        public string Username { get; set; }
        public int Level { get; set; }
        public int XP { get; set; }
        public int Currency { get; set; }
        public int STR { get; set; }
        public int INT { get; set; }
        public int DEF { get; set; }
        public int CurrentHP { get; set; }
        public int MaxHP { get; set; }
        public int? AvatarItemId { get; set; }
    }
}