using System.ComponentModel.DataAnnotations;

namespace Bl.DTOs
{
    public class PromptRequestDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [Required]
        public int SubCategoryId { get; set; }
        [Required]
        public string PromptText { get; set; }

    }
}
