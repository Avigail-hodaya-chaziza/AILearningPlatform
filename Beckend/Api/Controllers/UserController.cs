using Bl.Exceptions;
using Bl.Services;
using Dal.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userService;

        public UserController(UserServices userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User user)
        {
            try
            {
                var registeredUser = await _userService.RegisterUserAsync(user.Name, user.Phone);
                return Ok(registeredUser);
            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message); // HTTP 409 Conflict
            }
            catch (Exception)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }

    }
}
