using Microsoft.Identity.Client;
using System.ComponentModel.DataAnnotations;

namespace Dal.Models
{
    public class User
    {
        //טבלה זו תשמור את המידע הבסיסי על כל משתמש רשום במערכת.
        public int Id { get; set; }
        
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        
        [Required]
        [Phone]
        public string Phone { get; set; }
        
        [Required]
        public Role Role { get; set; }

        public ICollection<Prompt> Prompts { get; set; }
    }
}