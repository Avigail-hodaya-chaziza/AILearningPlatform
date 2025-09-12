using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;
using Dal.UnitOfWork;

namespace Bl.Services
{
     public class PromptService
    {
        private readonly IUnitOfWork _unitOfWork;
        // נשתמש בספק AI
        // private readonly IOpenAIService _openAIService;

        public PromptService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            // נפעיל את ספק ה-AI בבנאי
            // _openAIService = openAIService;
        }

        // פונקציה ליצירת בקשה חדשה ושמירתה
        public async Task<string> CreatePromptAsync(int userId, int categoryId, int subCategoryId, string promptText)
        {
            // בדיקת תקינות הקלט: לוודא שהמשתמש, הקטגוריה ותת-הקטגוריה קיימים
            var user = await _unitOfWork.Users.GetUserByIdAsync(userId);
            var category = await _unitOfWork.Categories.GetCategoryByIdAsync(categoryId);
            var subCategory = await _unitOfWork.Categories.GetSubCategoryByIdAsync(subCategoryId);

            if (user == null || category == null || subCategory == null)
            {
                // ניתן לזרוק כאן חריגה
                return "Error: Invalid user, category, or sub-category.";
            }

            // יצירת קלט עבור ה-AI (למשל: "Teach me about black holes in Science-Space")
            string aiInput = $"Teach me about {promptText}. The topic is {category.Name} - {subCategory.Name}.";

            // שליחת הקלט לספק ה-AI וקבלת התשובה
            //string aiResponse = await _openAIService.GetAIResponse(aiInput);
            string aiResponse = "This is a placeholder response from the AI."; // נחליף את זה בקריאה אמיתית

            // יצירת אובייקט Prompt חדש
            var newPrompt = new Prompt
            {
                UserId = userId,
                CategoryId = categoryId,
                SubCategoryId = subCategoryId,
                PromptText = promptText,
                Response = aiResponse,
                CreatedAt = DateTime.UtcNow
            };

            // שמירת האובייקט בבסיס הנתונים באמצעות רפוזיטורי
            await _unitOfWork.Prompts.AddPromptAsync(newPrompt);

            // החזרת התשובה
            return aiResponse;
        }

        // פונקציה לקבלת היסטוריית הבקשות של משתמש מסוים
        public async Task<List<Prompt>> GetUserPromptsHistoryAsync(int userId)
        {
            return await _unitOfWork.Prompts.GetUserPromptsAsync(userId);
        }
    }
}
   
