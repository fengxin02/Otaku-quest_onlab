namespace OtakuQuest.Server.Models
{
    public enum TaskType
    {
        Study,
        Workout,
        Hobby,
        Social,
        Health

    }
    public enum DifficultyRank
    {
        E,D,C, B, A, S
    }

    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed,
        Failed
    }

}
