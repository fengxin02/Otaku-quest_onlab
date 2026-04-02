using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.Models
{
    public class UserItem
    {
        [Required]
        public int Id { get; set; }

        //Who owns this item
        [Required]
        public int UserId { get; set; }
        [Required]
        public User User { get; set; } = null!;

        //What item is it
        [Required]
        public int ItemId { get; set; }
        [Required]
        public Item Item { get; set; } = null!;

        public DateTime AcquiredAt { get; set; } = DateTime.UtcNow;

    }
}
