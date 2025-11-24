using System.ComponentModel.DataAnnotations;

namespace Bl.DTOs
{
    public class UserRequestDTOs
    {
        [Required]
        public required string Name { get; set; }
        
        [Required]
        public required string Phone { get; set; }
    }
}
