using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Identity.Client;

namespace Dal.Models
{
    public class SubCategory
    {
        //טבלה זו תשמור את תתי-הקטגוריות (למשל: חלל, עבור הקטגוריה 'מדע').
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Prompt> Prompts { get; set; }
    }
}
