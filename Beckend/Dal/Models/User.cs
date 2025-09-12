using Microsoft.Identity.Client;

namespace Dal.Models
{
    public class User
    {
        //טבלה זו תשמור את המידע הבסיסי על כל משתמש רשום במערכת.
        public int Id { get; set; }
        public string Name { get; set; }
        public string Phone { get; set; }
        public ICollection<Prompt> Prompts { get; set; }
    }
}