using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.DTOs
{
    public class AdminRequestDto
    {
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        public string PassWord { get; set; }
        [Required]
        public string phoneNumber { get; set; }
    }
}
