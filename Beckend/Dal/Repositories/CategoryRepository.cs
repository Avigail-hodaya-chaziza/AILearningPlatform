using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Data;
using Dal.Models;
using Microsoft.EntityFrameworkCore;

namespace Dal.Repositories
{
    public class CategoryRepository:ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        // מחזיר רשימה של כל הקטגוריות
        public async Task<List<Category>> GetCategoriesAsync()
        {
            return await _context.Categories.ToListAsync();
        }

        // מחזיר רשימה של תתי-קטגוריות עבור קטגוריה ספציפית
        public async Task<List<SubCategory>> GetSubCategoriesByCategoryIdAsync(int categoryId)
        {
            return await _context.SubCategories
                                 .Where(sc => sc.CategoryId == categoryId)
                                 .ToListAsync();
        }

        // מוצא קטגוריה לפי מזהה
        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _context.Categories.FindAsync(id);
        }

        // מוצא תת-קטגוריה לפי מזהה
        public async Task<SubCategory> GetSubCategoryByIdAsync(int id)
        {
            return await _context.SubCategories.FindAsync(id);
        }
    }
}