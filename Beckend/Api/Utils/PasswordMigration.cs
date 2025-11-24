using Dal.Data;
using Dal.Models;
using System;
using System.Linq;
using BCrypt.Net;

namespace Api.Utils
{
    public static class PasswordMigration
    {
        public static void MigratePasswordsToHash(AppDbContext context)
        {
            // לא צריך יותר - אין שדה Password
        }
    }
}
