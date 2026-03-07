namespace OtakuQuest.Server.Models
{
    public class TodoTask
    {
        public int Id { get; set; } 

        // Foreign Key for User table
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        public string Title { get; set; } = "Challenge";
        public string Description { get; set; } = string.Empty;

        public TaskType Type { get; set; }
        public DifficultyRank DifficultyRank { get; set; }
        public TaskStatus Status { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
