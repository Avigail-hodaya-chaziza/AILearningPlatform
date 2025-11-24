
namespace Dal.Models
{
    public class Category
    {
        //טבלה זו תשמור את הקטגוריות הראשיות (למשל: מדע, היסטוריה).
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; } = new List<SubCategory>();
    }
}