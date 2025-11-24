using Bl.Exceptions;
using Bl.Services;
using Bl.DTOs;
using Dal.Models;
using Dal.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Authorization;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userService;
        private readonly IJwtService _jwtService;

        public UserController(UserServices userService, IJwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginUser([FromBody] UserLoginDto request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Phone))
            {
                return BadRequest("יש לספק מספר טלפון.");
            }
            var phone = Regex.Replace(request.Phone.Trim(), "\\s+", "");
            var user = await _userService.LoginUserByPhoneAsync(phone);
            if (user == null)
            {
                return Unauthorized("משתמש לא נמצא. יש להירשם תחילה.");
            }
            var token = _jwtService.GenerateToken(user);
            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax
            });
            return Ok(new { token, user.Id, user.Name, user.Phone });
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> RegisterUser([FromBody] UserRequestDTOs request)
        {
            if (request == null)
            {
                return BadRequest("גוף הבקשה חסר.");
            }

            var name = request.Name?.Trim();
            var phoneRaw = request.Phone?.Trim();

            if (string.IsNullOrEmpty(name) || string.IsNullOrEmpty(phoneRaw))
            {
                return BadRequest("שם ומספר טלפון חייבים.");
            }

            var phoneNormalized = Regex.Replace(phoneRaw, "\\s+", "");
            if (phoneNormalized.Length < 9 || phoneNormalized.Length > 15)
            {
                return BadRequest("פורמט מספר הטלפון אינו תקין.");
            }

            Console.WriteLine($"[REGISTER] Attempt Name='{name}' (len={name.Length}) Phone='{phoneNormalized}' (len={phoneNormalized.Length})");
            try
            {
                var registeredUser = await _userService.RegisterUserAsync(name, phoneNormalized);
                Console.WriteLine($"[REGISTER] Success: new user id={registeredUser.Id}");
                return Ok(new { registeredUser.Id, registeredUser.Name, registeredUser.Phone });
            }
            catch (UserAlreadyExistsException ex)
            {
                Console.WriteLine($"[REGISTER] Conflict (existing phone): {phoneNormalized}");
                return Conflict(ex.Message);
            }
            catch (DbUpdateException dbEx)
            {
                Console.WriteLine($"[REGISTER] DbUpdateException: {dbEx.Message}");
                return Conflict("מספר הטלפון כבר רשום.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[REGISTER] Unexpected error: {ex.Message}");
                return StatusCode(500, $"שגיאה לא צפויה: {ex.Message}");
            }
        }
    }
}
