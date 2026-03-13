
using OtakuQuest.Server.Models;
namespace OtakuQuest.Server.DTOs
{
    public class CreateTaskDto
    {
        public string Title { get; set; } = "Challenge";
        public string Description { get; set; } = string.Empty;
        public TaskType Type { get; set; }
        public DifficultyRank DifficultyRank { get; set; }
    }
}
