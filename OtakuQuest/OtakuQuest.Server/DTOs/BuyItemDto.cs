using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class BuyItemDto
    {
        [Required]
        public int ItemId { get; set; }
    }
}
