using Bl.Exceptions;
using Dal.Models;
using Dal.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class UserServices
    {
        private readonly IUnitOfWork _unitOfWork;


    public UserServices(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<User> RegisterUserAsync(string name, string phone)
    {
        var existingUser = await _unitOfWork.Users.GetUserByPhoneAsync(phone);
        if (existingUser != null)
        {
                throw new UserAlreadyExistsException("This phone number is already registered.");
            }

        var newUser = new User
        {
            Name = name,
            Phone = phone,
            Role = Role.User
        };

        await _unitOfWork.Users.AddUser(newUser);

        return newUser;
    }
        public async Task<User> ValidateUserAsync(string phone, string password)
        {
            if (string.IsNullOrWhiteSpace(phone) || string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("שם המשתמש והסיסמה אינם יכולים להיות ריקים.");
            }

            if (phone.Length < 9 || phone.Length > 15 )
            {
                throw new ArgumentException("פורמט מספר טלפון אינו תקין.");
            }

          
            var user = await _unitOfWork.Users.GetUserByPhoneAsync(phone);

            // 3. החזרת התוצאה
            return user;
        }

        public async Task<int> GetTotalUsersCountAsync()
        {
            return await _unitOfWork.Users.GetTotalUsersCountAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _unitOfWork.Users.GetAllUsersAsync();
        }

        public async Task<User?> LoginUserByPhoneAsync(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone))
            {
                return null;
            }
            var normalized = phone.Trim();
            return await _unitOfWork.Users.GetUserByPhoneAsync(normalized);
        }
    }
}