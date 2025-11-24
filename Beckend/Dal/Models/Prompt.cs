using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Models
{
    public class Prompt
    {
        // שתשמור את היסטוריית הלמידה של כל משתמש. היא מקשרת בין משתמשים לקטגוריות ותתי-קטגוריות, ושומרת את השאילתה שנשלחה ל-AI ואת התשובה שהתקבלה.
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string PromptText { get; set; }
        public string Response { get; set; }
        public DateTime CreatedAt { get; set; }
        public User User { get; set; }
        public Category Category { get; set; }
        public SubCategory SubCategory { get; set; }
    }
}
