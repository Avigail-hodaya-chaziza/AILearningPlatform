using Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Repositories
{
    public interface IJwtService
    {
        string GenerateToken(Admin admin);
        string GenerateToken(User user);
    }
}

