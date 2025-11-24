using Dal.Models;

namespace Bl.Services
{
    public interface IPromptService
    {
        Task<string> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText);
        Task<List<Prompt>> GetUserPromptsHistoryAsync(int userId);
        Task<int> GetTotalPromptsCountAsync();
        Task<int> GetTodayPromptsCountAsync();
        Task<List<Prompt>> GetAllPromptsAsync();
        Task<List<Prompt>> GetTodayPromptsAsync();
    }
}