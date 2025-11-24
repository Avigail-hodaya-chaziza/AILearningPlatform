using Microsoft.AspNetCore.Mvc;
using Bl.Services;
using Dal.Models;
using Dal.Repositories;
using System.Threading.Tasks;
using Bl.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;
        private readonly IJwtService _jwtService;
        private readonly UserServices _userService;
        private readonly IPromptService _promptService;

        public AdminController(AdminService adminService, IJwtService jwtService, UserServices userService, IPromptService promptService)
        {
            _adminService = adminService;
            _jwtService = jwtService;
            _userService = userService;
            _promptService = promptService;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] AdminLoginDto admin)
        {
            if (admin == null || string.IsNullOrEmpty(admin.Name) || string.IsNullOrEmpty(admin.PassWord))
            {
                return BadRequest("נא להזין שם משתמש וסיסמה.");
            }

            var name = (admin.Name ?? string.Empty).Trim();
            var password = (admin.PassWord ?? string.Empty).Trim();

            var existingAdmin = await _adminService.GetAdminAsync(name, password);
            if (existingAdmin == null)
            {
                return Unauthorized("שם משתמש או סיסמה שגויים.");
            }

            var token = _jwtService.GenerateToken(existingAdmin);
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax
            });

            return Ok(new
            {
                token,
                Message = "התחברת בהצלחה!",
                AdminName = existingAdmin.Name
            });
        }

        [HttpPut("change-password")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ChangePassword([FromBody] AdminRequestDto request, string NewPassword)
        {
            if (request == null ||
                string.IsNullOrEmpty(request.Name) ||
                string.IsNullOrEmpty(request.PassWord) ||
                string.IsNullOrEmpty(NewPassword))
            {
                return BadRequest("נא להזין את כל השדות הנדרשים.");
            }

            bool updated = await _adminService.UpdateAdminPasswordAsync(
                request.Name,
                request.PassWord,
                NewPassword
            );

            if (!updated)
            {
                return Unauthorized("שם משתמש או סיסמה שגויים.");
            }

            return Ok("הסיסמה עודכנה בהצלחה!");
        }

        [HttpGet("stats")]
        [Authorize]
        public async Task<IActionResult> GetStats()
        {
            try
            {
                var totalUsers = await _userService.GetTotalUsersCountAsync();
                var totalPrompts = await _promptService.GetTotalPromptsCountAsync();
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
                return StatusCode(500, $"שגיאה בקבלת סטטיסטיקות: {ex.Message}");
            }
        }

        [HttpGet("users")]
        [Authorize]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var users = await _userService.GetAllUsersAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה בקבלת רשימת משתמשים: {ex.Message}");
            }
        }

        [HttpGet("prompts")]
        [Authorize]
        public async Task<IActionResult> GetAllPrompts()
        {
            try
            {
                // Return only today's prompts instead of entire history
                var prompts = await _promptService.GetTodayPromptsAsync();
                return Ok(prompts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה בקבלת רשימת פרומפטים: {ex.Message}");
            }
        }

        [HttpGet("prompts/today")]
        [Authorize]
        public async Task<IActionResult> GetTodayPrompts()
        {
            try
            {
                var prompts = await _promptService.GetTodayPromptsAsync();
                return Ok(prompts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה בקבלת רשימת פרומפטים להיום: {ex.Message}");
            }
        }
    }
}

 
