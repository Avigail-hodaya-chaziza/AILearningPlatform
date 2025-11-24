using Dal.Models;
using Dal.Repositories;
using Dal.UnitOfWork;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class CategoryService
    {
        private readonly IUnitOfWork _UnitOfWork;
        private readonly ILogger<CategoryService> _logger; // נוסף: ILogger

        // עדכון: הזרקת ILogger בנוסף ל-IUnitOfWork
        public CategoryService(IUnitOfWork UnitOfWork, ILogger<CategoryService> logger)
        {
            _UnitOfWork = UnitOfWork;
            _logger = logger;
            _logger.LogInformation("CategoryService initialized.");
        }

        public async Task<List<Category>> GetCategoriesAsync()
        {
            _logger.LogInformation("Attempting to retrieve all categories.");
            try
            {
                var categories = await _UnitOfWork.Categories.GetCategoriesAsync();

                if (categories == null || categories.Count == 0)
                {
                    _logger.LogWarning("No categories found in the database.");
                }

                _logger.LogDebug("Successfully retrieved {Count} categories.", categories?.Count ?? 0);
                return categories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "FATAL ERROR during retrieval of all categories.");
                throw;
            }
        }

        public async Task<List<SubCategory>> GetSubCategoriesAsync(int categoryId)
        {
            _logger.LogInformation("Attempting to retrieve subcategories for Category ID: {CategoryId}", categoryId);

            if (categoryId <= 0)
            {
                _logger.LogWarning("Invalid Category ID provided: {CategoryId}", categoryId);
                throw new ArgumentException("Category ID must be a positive integer.");
            }

            try
            {
                var subCategories = await _UnitOfWork.Categories.GetSubCategoriesByCategoryIdAsync(categoryId);

                if (subCategories == null || subCategories.Count == 0)
                {
                    _logger.LogWarning("No subcategories found for Category ID: {CategoryId}", categoryId);
                }

                _logger.LogDebug("Successfully retrieved {Count} subcategories for Category ID: {CategoryId}", subCategories?.Count ?? 0, categoryId);
                return subCategories;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "FATAL ERROR during retrieval of subcategories for Category ID: {CategoryId}", categoryId);
                throw;
            }
        }

        public async Task SeedCategoriesAsync()
        {
            _logger.LogInformation("Starting to seed categories.");
            try
            {
                // בדיקה אם כבר יש קטגוריות
                var existingCategories = await _UnitOfWork.Categories.GetCategoriesAsync();
                if (existingCategories != null && existingCategories.Count > 0)
                {
                    _logger.LogInformation("Categories already exist. Skipping seed.");
                    return;
                }

                // יצירת קטגוריות בסיסיות
                var categories = new List<Category>
                {
                    new Category { Name = "מתמטיקה" },
                    new Category { Name = "מדעים" },
                    new Category { Name = "היסטוריה" },
                    new Category { Name = "שפות" }
                };

                foreach (var category in categories)
                {
                    await _UnitOfWork.Categories.AddCategoryAsync(category);
                }

                // יצירת תת-קטגוריות
                var subCategories = new List<SubCategory>
                {
                    new SubCategory { Name = "אלגברה", CategoryId = 1 },
                    new SubCategory { Name = "גיאומטריה", CategoryId = 1 },
                    new SubCategory { Name = "פיזיקה", CategoryId = 2 },
                    new SubCategory { Name = "כימיה", CategoryId = 2 },
                    new SubCategory { Name = "עולם עתיק", CategoryId = 3 },
                    new SubCategory { Name = "ימי הביניים", CategoryId = 3 },
                    new SubCategory { Name = "אנגלית", CategoryId = 4 },
                    new SubCategory { Name = "עברית", CategoryId = 4 }
                };

                foreach (var subCategory in subCategories)
                {
                    await _UnitOfWork.Categories.AddSubCategoryAsync(subCategory);
                }

                _logger.LogInformation("Successfully seeded categories and subcategories.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error seeding categories.");
                throw;
            }
        }

        public async Task<Category> AddCategoryAsync(string name)
        {
            _logger.LogInformation("Adding new category: {Name}", name);
            try
            {
                var category = new Category { Name = name };
                await _UnitOfWork.Categories.AddCategoryAsync(category);
                _logger.LogInformation("Successfully added category: {Name}", name);
                return category;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding category: {Name}", name);
                throw;
            }
        }

        public async Task<SubCategory> AddSubCategoryAsync(int categoryId, string name)
        {
            _logger.LogInformation("Adding new subcategory: {Name} to category: {CategoryId}", name, categoryId);
            try
            {
                var subCategory = new SubCategory 
                { 
                    Name = name, 
                    CategoryId = categoryId 
                };
                await _UnitOfWork.Categories.AddSubCategoryAsync(subCategory);
                _logger.LogInformation("Successfully added subcategory: {Name}", name);
                return subCategory;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding subcategory: {Name}", name);
                throw;
            }
        }
    }
}
