using Microsoft.EntityFrameworkCore;
using OtakuQuest.Server.Models;

namespace OtakuQuest.Server.Data
{
    public class OtakuQuestDbContext :DbContext
    {
        public OtakuQuestDbContext(DbContextOptions<OtakuQuestDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<TodoTask> Tasks { get; set; } = null!;
    

    }
}
