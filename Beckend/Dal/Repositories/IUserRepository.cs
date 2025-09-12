using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Repositories
{
    public interface IUserRepository
    {
        Task AddUser(User user);
        Task<User> GetUserByPhoneAsync(string phone);
        Task<User> GetUserByIdAsync(int id);
    }
}
