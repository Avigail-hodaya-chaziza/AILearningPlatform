using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategoriesAsync();
        Task<List<SubCategory>> GetSubCategoriesByCategoryIdAsync(int categoryId);
        Task<Category> GetCategoryByIdAsync(int id);
        Task<SubCategory> GetSubCategoryByIdAsync(int id);
    }
}
