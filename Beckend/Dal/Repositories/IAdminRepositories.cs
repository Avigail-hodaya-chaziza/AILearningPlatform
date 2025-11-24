using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public interface IAdminRepositories
    {
        Task<Admin?> GetAdminAsync(string username, string password);
        Task UpdateAdminAsync(Admin admin);
      Task<int> CountByNameAsync(string username);
        Task<Admin?> GetAdminByNameAsync(string username);

    }
}
