using Bl.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptsController : ControllerBase
    {
            
        private readonly PromptService _promptService;

        public PromptsController(PromptService promptService)
        {
            _promptService = promptService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrompt([FromBody] dynamic promptData)
        {
            // כאן תעביר את הנתונים לשכבת ה-BL
            int userId = promptData.userId;
            int categoryId = promptData.categoryId;
            int subCategoryId = promptData.subCategoryId;
            string promptText = promptData.promptText;

            string response = await _promptService.CreatePromptAsync(userId, categoryId, subCategoryId, promptText);
            return Ok(new { response });
        }

        [HttpGet("history/{userId}")]
        public async Task<IActionResult> GetUserHistory(int userId)
        {
            var history = await _promptService.GetUserPromptsHistoryAsync(userId);
            return Ok(history);
        }
    }

}
