using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;
using Dal.Repositories;
using Dal.UnitOfWork;

namespace Bl.Services
{
    public class CategoryService
    {
        private readonly IUnitOfWork _UnitOfWork;
        public CategoryService (IUnitOfWork UnitOfWork) 
        {
            _UnitOfWork = UnitOfWork;
        }
        public async Task<List<Category>> GetCategoriesAsync() 
        {
            return await _UnitOfWork.Categories.GetCategoriesAsync();
        }
        public async Task<List<SubCategory>> GetSubCategoriesAsync(int categoryId)
        {
            return await _UnitOfWork.Categories.GetSubCategoriesByCategoryIdAsync(categoryId);
        }
    }
}
