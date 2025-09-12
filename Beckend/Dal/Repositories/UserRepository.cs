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
    public class UserRepository:IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddUser(User user) 
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User> GetUserByPhoneAsync(string phone)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Phone == phone);
        }

        // פונקציה למציאת משתמש לפי מזהה
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
