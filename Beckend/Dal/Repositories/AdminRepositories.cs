using Dal.Data;
using Dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{

    public class AdminRepositories:IAdminRepositories
    {
        private readonly AppDbContext _context;

        public AdminRepositories(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Admin?> GetAdminAsync(string username, string password)
        {
            var u = username?.Trim() ?? string.Empty;
            var p = password?.Trim() ?? string.Empty;
            return await _context.Admin.FirstOrDefaultAsync(a => a.Name.Trim() == u && a.PassWord.Trim() == p);
        }

        public async Task<int> CountByNameAsync(string username)
        {
            return await _context.Admin.CountAsync(a => a.Name == username);
        }

        public async Task<Admin?> GetAdminByNameAsync(string username)
        {
            var u = username?.Trim() ?? string.Empty;
            return await _context.Admin.FirstOrDefaultAsync(a => a.Name.Trim() == u);
        }

        public async Task UpdateAdminAsync(Admin admin)
        {
            _context.Admin.Update(admin);
            await _context.SaveChangesAsync();
        }

    }
}
