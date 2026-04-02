using System.ComponentModel.DataAnnotations;

namespace OtakuQuest.Server.DTOs
{
    public class AuthResponseDto
    {
        [Required]
        public string Token { get; set; }
        [Required]
        public string Message { get; set; }
    }
}