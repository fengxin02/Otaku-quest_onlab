namespace OtakuQuest.Server.Models
{
    public class UserItem
    {
        public int Id { get; set; }

        //Who owns this item
        public int UserId { get; set; }
        public User User { get; set; } = null!;

        //What item is it
        public int ItemId { get; set; }
        public Item Item { get; set; } = null!;

        public DateTime AcquiredAt { get; set; } = DateTime.UtcNow;

    }
}
