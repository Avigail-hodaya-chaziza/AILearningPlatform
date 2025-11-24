using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;
using Dal.UnitOfWork;
using Microsoft.Extensions.Logging;


namespace Bl.Services
{
     public class PromptService : IPromptService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<PromptService> _logger;
        private readonly OpenAIService _openAIService;

        public PromptService(IUnitOfWork unitOfWork, ILogger<PromptService> logger, OpenAIService openAIService)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _openAIService = openAIService;
        }

        public async Task<string> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
        {
            _logger.LogInformation("Attempting to create prompt for User: {UserId}, Category: {CategoryId}, SubCategory: {SubCategoryId}",
                userId, categoryId, subCategoryId);

            var user = await _unitOfWork.Users.GetUserByIdAsync(userId);
            var category = await _unitOfWork.Categories.GetCategoryByIdAsync(categoryId);
            var subCategory = await _unitOfWork.Categories.GetSubCategoryByIdAsync(subCategoryId);

            if (user == null || category == null || subCategory == null)
            {
                _logger.LogWarning("Validation failed. User, Category, or SubCategory not found. UserID: {UserId}, CatID: {CategoryId}, SubCatID: {SubCategoryId}",
                    userId, categoryId, subCategoryId);

                throw new ArgumentException("Invalid user, category, or sub-category ID provided.");
            }

            try
            {
                string aiInput = $"Teach me about {promptText}. The topic is {category.Name} - {subCategory.Name}.";

                string aiResponse = await _openAIService.GenerateResponseAsync(aiInput, category.Name, subCategory.Name);
                
                var newPrompt = new Prompt
                {
                    UserId = userId,
                    CategoryId = categoryId,
                    SubCategoryId = subCategoryId,
                    PromptText = promptText,
                    Response = aiResponse,
                    CreatedAt = DateTime.UtcNow
                };

                await _unitOfWork.Prompts.AddPromptAsync(newPrompt);
                await _unitOfWork.CompleteAsync(); 
                _logger.LogInformation("Prompt created and saved successfully for User: {UserId}", userId);

                return aiResponse;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "FATAL ERROR during prompt creation or saving for User: {UserId}", userId);

                throw;
            }

        }
        public async Task<List<Prompt>> GetUserPromptsHistoryAsync(int userId)
        {
            List<Prompt> prompts = await _unitOfWork.Prompts.GetUserPromptsAsync(userId);
            
            if (prompts == null || !prompts.Any())
            {
                _logger.LogInformation("No prompts found for User: {UserId}", userId);
            }       
            return prompts;
        }

        public async Task<int> GetTotalPromptsCountAsync()
        {
            return await _unitOfWork.Prompts.GetTotalPromptsCountAsync();
        }

        public async Task<int> GetTodayPromptsCountAsync()
        {
            return await _unitOfWork.Prompts.GetTodayPromptsCountAsync();
        }

        public async Task<List<Prompt>> GetAllPromptsAsync()
        {
            return await _unitOfWork.Prompts.GetAllPromptsAsync();
        }

        public async Task<List<Prompt>> GetTodayPromptsAsync()
        {
            return await _unitOfWork.Prompts.GetTodayPromptsAsync();
        }
    }
}
   
