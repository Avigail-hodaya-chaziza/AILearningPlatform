using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Dtos
{
    public class PromptResponseDto
    {
        public int Id { get; set; }
        public string PromptText { get; set; }
        public string Response { get; set; }
        public DateTime CreatedAt { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }
    }
}
