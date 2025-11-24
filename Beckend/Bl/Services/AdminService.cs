using Dal.Models;
using Dal.Repositories;
using Dal.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class AdminService
    {
        private readonly IUnitOfWork _UnitOfWork;
        public AdminService(IUnitOfWork UnitOfWork)
        {
            _UnitOfWork = UnitOfWork ?? throw new ArgumentNullException(nameof(UnitOfWork));
            if (_UnitOfWork.Admin == null) throw new InvalidOperationException("IUnitOfWork.Admin is not initialized.");
        }
        public async Task<Admin?> GetAdminAsync(string username, string password)
        {
            return await _UnitOfWork.Admin.GetAdminAsync(username, password);
        }
        public async Task<Admin?> GetAdminByNameAsync(string username)
        {
            return await _UnitOfWork.Admin.GetAdminByNameAsync(username);
        }
        public async Task<int> CountAdminsByNameAsync(string username)
        {
            // Uses repository context directly for a count ignoring password
            return await _UnitOfWork.Admin.CountByNameAsync(username);
        }
        public async Task<bool> UpdateAdminPasswordAsync(string username, string password, string newPassword)
        {
            var admin = await _UnitOfWork.Admin.GetAdminAsync(username, password);

            if (admin == null)
            {
                return false;
            }

            admin.PassWord = newPassword;

            await _UnitOfWork.Admin.UpdateAdminAsync(admin);

            return true;
        }
    }
}
