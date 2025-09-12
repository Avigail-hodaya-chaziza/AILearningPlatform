using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal.Models;

namespace Dal.Repositories
{
    public interface IPromptRepository
    {
        Task AddPromptAsync(Prompt prompt);
        Task<List<Prompt>> GetUserPromptsAsync(int userId);

    }
}
