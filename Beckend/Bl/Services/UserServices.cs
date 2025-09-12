using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Bl.Exceptions;
using Dal.Models;
using Dal.UnitOfWork;

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
            Phone = phone
        };

        await _unitOfWork.Users.AddUser(newUser);

        return newUser;
    }
}
}