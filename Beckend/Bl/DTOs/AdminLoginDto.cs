using System.ComponentModel.DataAnnotations;

namespace Bl.DTOs
{
    public class AdminLoginDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string PassWord { get; set; } = string.Empty;
    }
}
