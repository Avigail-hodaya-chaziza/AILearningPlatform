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
    public class PromptRepository:IPromptRepository
    {
        private readonly AppDbContext _context;

        public PromptRepository(AppDbContext context)
        {
            _context = context;
        }

        // שמירת בקשה חדשה והתשובה שלה בבסיס הנתונים
        public async Task AddPromptAsync(Prompt prompt)
        {
            await _context.Prompts.AddAsync(prompt);
            await _context.SaveChangesAsync();
        }

        // קבלת כל היסטוריית הבקשות של משתמש
        public async Task<List<Prompt>> GetUserPromptsAsync(int userId)
        {
            return await _context.Prompts
                                 .Where(p => p.UserId == userId)
                                 .OrderByDescending(p => p.CreatedAt)
                                .ToListAsync();
        }

        public async Task<int> GetTotalPromptsCountAsync()
        {
            return await _context.Prompts.CountAsync();
        }

        public async Task<int> GetTodayPromptsCountAsync()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);
            return await _context.Prompts
                .Where(p => p.CreatedAt >= today && p.CreatedAt < tomorrow)
                .CountAsync();
        }

        public async Task<List<Prompt>> GetAllPromptsAsync()
        {
            return await _context.Prompts
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Prompt>> GetTodayPromptsAsync()
        {
            var today = DateTime.Today;
            var tomorrow = today.AddDays(1);
            return await _context.Prompts
                .Where(p => p.CreatedAt >= today && p.CreatedAt < tomorrow)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }
    }
}



