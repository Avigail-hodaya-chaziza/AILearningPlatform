using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

        [HttpPost("seed")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SeedCategories()
        {
            try
            {
                await _categoryService.SeedCategoriesAsync();
                return Ok("קטגוריות נוספו בהצלחה");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה: {ex.Message}");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddCategory([FromBody] System.Text.Json.JsonElement request)
        {
            try
            {
                string name = request.GetProperty("name").GetString();
                if (string.IsNullOrEmpty(name))
                {
                    return BadRequest("שם הקטגוריה חייב");
                }

                var category = await _categoryService.AddCategoryAsync(name);
                return Ok(category);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה: {ex.Message}");
            }
        }

        [HttpPost("subcategories")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddSubCategory([FromBody] System.Text.Json.JsonElement request)
        {
            try
            {
                string name = request.GetProperty("name").GetString();
                int categoryId = request.GetProperty("categoryId").GetInt32();
                
                if (string.IsNullOrEmpty(name) || categoryId <= 0)
                {
                    return BadRequest("שם התת-קטגוריה ומזהה הקטגוריה חייבים");
                }

                var subCategory = await _categoryService.AddSubCategoryAsync(categoryId, name);
                return Ok(subCategory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה: {ex.Message}");
            }
        }
    }
}
