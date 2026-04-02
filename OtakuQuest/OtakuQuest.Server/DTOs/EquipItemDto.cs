using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class EquipItemDto
    {
        [Required]
        public int ItemId { get; set; }
    }
}
