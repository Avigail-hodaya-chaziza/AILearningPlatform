using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Data;

using Dal.Models;
using Dal.Repositories;

namespace Dal.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
            Users= new UserRepository(_context);
            Categories = new CategoryRepository(_context);
            Prompts = new PromptRepository(_context);
        }

        public IUserRepository Users { get; private set; }
        public ICategoryRepository Categories { get; private set; }
        public IPromptRepository Prompts { get; private set; }

        public async Task<int> CompleteAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

