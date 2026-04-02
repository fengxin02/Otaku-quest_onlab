using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.Models
{
    public class User
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Username { get; set; } = "User";
        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        // RPG Statistics
        [Required]
        public int Level { get; set; } = 1;
        [Required]
        public int XP { get; set; } = 0;
        [Required]
        public int Currency { get; set; } = 0;
        [Required]
        public int MaxHP { get; set; } = 100;
        [Required]
        public int CurrentHP { get; set; } = 100;
        [Required]
        public int STR { get; set; } = 1;
        [Required]
        public int INT { get; set; } = 1;
        [Required]
        public int DEF { get; set; } = 1; 

        // Foreign keys for the items
        public int? AvatarItemId { get; set; } 
        public int? BackgroundItemId { get; set; }

        // Navigációs tulajdonság: Egy felhasználónak több feladata lehet (N:1 kapcsolat)
        //1 User - N Tasks
        [Required]
        public ICollection<TodoTask> Tasks { get; set; } = new List<TodoTask>();

        //Foreign Keys
        public int? EquippedWeaponId { get; set; }
        public Item? EquippedWeapon { get; set; }

        public int? EquippedAvatarId { get; set; }

        public Item? EquippedAvatar { get; set; }

        public int? EquippedBackgroundId { get; set; }
        public Item? EquippedBackground { get; set; }

        // Every item the user has ever acquired, including equipped and unequipped items
        [Required]
        public ICollection<UserItem> Inventory { get; set; } = new List<UserItem>();

    }
}
