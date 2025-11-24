using System.Net;
using System.Text.Json;
using Bl.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Api.Middleware
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionMiddleware> _logger;

        public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (KeyNotAvailableException ex)
            {
                await WriteErrorAsync(context, HttpStatusCode.NotFound, ex.Message, "KEY_NOT_AVAILABLE");
            }
            catch (QuotaExceededException ex)
            {
                await WriteErrorAsync(context, HttpStatusCode.TooManyRequests, ex.Message, "QUOTA_EXCEEDED");
            }
            catch (UserAlreadyExistsException ex)
            {
                await WriteErrorAsync(context, HttpStatusCode.Conflict, ex.Message, "USER_EXISTS");
            }
            catch (ArgumentException ex)
            {
                await WriteErrorAsync(context, HttpStatusCode.BadRequest, ex.Message, "BAD_REQUEST");
            }
            catch (HttpRequestException ex)
            {
                await WriteErrorAsync(context, HttpStatusCode.BadGateway, "שגיאה בתקשורת חיצונית.", "UPSTREAM_ERROR", ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");
                await WriteErrorAsync(context, HttpStatusCode.InternalServerError, "שגיאת שרת כללית.", "SERVER_ERROR");
            }
        }

        private static async Task WriteErrorAsync(HttpContext context, HttpStatusCode status, string message, string code, string? details = null)
        {
            context.Response.StatusCode = (int)status;
            context.Response.ContentType = "application/json";
            var payload = new
            {
                code,
                message,
                details,
                traceId = context.TraceIdentifier
            };
            var json = JsonSerializer.Serialize(payload);
            await context.Response.WriteAsync(json);
        }
    }
}
