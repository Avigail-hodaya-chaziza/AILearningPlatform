using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly CategoryService _categoryService;

        public CategoryController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetCategoriesAsync();
            if (categories == null || !categories.Any())
            {
                return NotFound();
            }
            return Ok(categories);
        }

        [HttpGet("{categoryId}/subcategories")]
        public async Task<ActionResult<List<SubCategory>>> GetSubCategories(int categoryId)
        {
            var subCategories = await _categoryService.GetSubCategoriesAsync(categoryId);
            if (subCategories == null || !subCategories.Any())
            {
                return NotFound();
            }
            return Ok(subCategories);
        }
    }
}
