using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Data;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;


namespace Dal.Models
{
    internal class AppDbContextFactory: IDesignTimeDbContextFactory<AppDbContext>
        {
            public AppDbContext CreateDbContext(string[] args)
            {
                var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
                optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=AILearningPlatformDb;Trusted_Connection=True;");

                return new AppDbContext(optionsBuilder.Options);
            }
        }
    }

