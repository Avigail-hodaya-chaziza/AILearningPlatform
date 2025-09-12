using AutoMapper;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserServices _userService;
        private readonly PromptService _promptService;
        private readonly IMapper _mapper;
        private readonly ILogger<AdminController> _logger;

        public AdminController(UserServices userService, PromptService promptService, IMapper mapper, ILogger<AdminController> logger)
        {
            _userService = userService;
            _promptService = promptService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUserAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user list");
                return StatusCode(500, "Server error");
            }
        }

        [HttpGet("prompts")]
        public async Task<ActionResult> GetAllPrompts()
        {
            try
            {
                var prompts = await _promptService.GetPromptsHistoryAsync();
                return Ok(prompts);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting prompt list");
                return StatusCode(500, "Server error");
            }
        }

        [HttpGet("stats")]
        public async Task<ActionResult> GetStats()
        {
            try
            {
                var totalUsers = await _userService.GetUsersCountAsync();
                var totalPrompts = await _promptService.GetPromptsCountAsync();
                var todayPrompts = await _promptService.GetTodayPromptsCountAsync();

                return Ok(new
                {
                    totalUsers,
                    totalPrompts,
                    todayPrompts
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting statistics");
                return StatusCode(500, "Server error");
            }
        }
    }
}
