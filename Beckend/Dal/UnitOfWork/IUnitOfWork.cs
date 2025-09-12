using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Data;
using Dal.Repositories;
using Dal.UnitOfWork;

namespace Dal.UnitOfWork
{
    public interface IUnitOfWork
    {
        IUserRepository Users { get; }
        ICategoryRepository Categories { get; }
        IPromptRepository Prompts { get; }

        Task<int> CompleteAsync();
    }
}

