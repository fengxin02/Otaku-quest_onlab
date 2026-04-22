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
    
        public DbSet<UserItem> UserItems { get; set; } = null!;
        public DbSet<Item> Items { get; set; } = null!;
        public DbSet<Boss> Bosses { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // It helps the database to understand that a User can have 3 different equipped items, and that they are all optional (nullable foreign keys).
            modelBuilder.Entity<User>()
                .HasOne(u => u.EquippedWeapon)
                .WithMany()
                .HasForeignKey(u => u.EquippedWeaponId)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<User>()
                .HasOne(u => u.EquippedAvatar)
                .WithMany()
                .HasForeignKey(u => u.EquippedAvatarId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<User>()
                .HasOne(u => u.EquippedBackground)
                .WithMany()
                .HasForeignKey(u => u.EquippedBackgroundId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserItem>()
                .HasOne(ui => ui.Item)
                .WithMany()
                .HasForeignKey(ui => ui.ItemId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
