using Dal.Models;

namespace Bl.DTOs
{
    public class CategoryRequestDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
    }
}
