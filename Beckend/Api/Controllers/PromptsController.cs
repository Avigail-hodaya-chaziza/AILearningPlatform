using Bl.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptsController : ControllerBase
    {
            
        private readonly IPromptService _promptService;

        public PromptsController(IPromptService promptService)
        {
            _promptService = promptService;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePrompt([FromBody] System.Text.Json.JsonElement promptData)
        {
            int userId = promptData.GetProperty("userId").GetInt32();
            int categoryId = promptData.GetProperty("categoryId").GetInt32();
            int subCategoryId = promptData.GetProperty("subCategoryId").GetInt32();
            string promptText = promptData.GetProperty("promptText").GetString();

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
