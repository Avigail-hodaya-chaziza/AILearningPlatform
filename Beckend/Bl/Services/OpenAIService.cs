using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;
using System.Text.Json;
namespace Bl.Services
{
    public class OpenAIService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<OpenAIService> _logger; // נוסף: ILogger
        private readonly string _apiKey;
        private readonly string _baseUrl;

        // עדכון: הזרקת ILogger בנוסף ל-HttpClient ו-IConfiguration
        public OpenAIService(HttpClient httpClient, IConfiguration configuration, ILogger<OpenAIService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            _apiKey = configuration["OpenAI:ApiKey"] ?? string.Empty;
            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                var envKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
                if (!string.IsNullOrWhiteSpace(envKey))
                {
                    _apiKey = envKey.Trim();
                }
            }
            if (string.IsNullOrWhiteSpace(_apiKey))
            {
                throw new Bl.Exceptions.KeyNotAvailableException();
            }
            _baseUrl = configuration["OpenAI:BaseUrl"] ?? "https://api.openai.com/v1";
            
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "OpenAI-DotNet");

            _logger.LogInformation("OpenAIService initialized successfully. Base URL: {BaseUrl}", _baseUrl);
        }

        public async Task<string> GenerateResponseAsync(string prompt, string category, string subCategory)
        {
            // רישום: כניסה לפונקציה
            _logger.LogDebug("Sending request to OpenAI. Category: {Category}, Prompt: {Prompt}", category, prompt.Substring(0, Math.Min(prompt.Length, 50)));

            var requestBody = new
            {
                model = "gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "system", content = $"You are a learning assistant for {category} - {subCategory}. Provide concise and accurate educational answers." },
                    new { role = "user", content = prompt }
                },
                max_tokens = 500
            };

            try
            {
                var fullUrl = $"{_baseUrl}/chat/completions";
                _logger.LogInformation("Making request to: {Url}", fullUrl);
                var response = await _httpClient.PostAsJsonAsync(fullUrl, requestBody);
                _logger.LogInformation("Received response with status: {StatusCode}", response.StatusCode);

                // בדיקת שגיאה לפני קבלת התוכן (למקרה של קוד סטטוס 4xx/5xx)
                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError("OpenAI API returned status code {StatusCode}. Error: {ErrorContent}", response.StatusCode, errorContent);

                    // זיהוי מכסה / עומס
                    if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests || errorContent.Contains("insufficient_quota") || errorContent.Contains("quota"))
                    {
                        throw new Bl.Exceptions.QuotaExceededException();
                    }

                    // זריקת חריגה ממוקדת אחרת
                    throw new HttpRequestException($"OpenAI API request failed with status {response.StatusCode}. Details: {errorContent}");
                }

                var jsonResponse = await response.Content.ReadFromJsonAsync<JsonDocument>();

                var content = jsonResponse?.RootElement
                                           .GetProperty("choices")[0]
                                           .GetProperty("message")
                                           .GetProperty("content")
                                           .GetString();

                if (string.IsNullOrEmpty(content))
                {
                    // רישום: בעיית תוכן
                    _logger.LogWarning("OpenAI response content was empty or null for prompt: {Prompt}", prompt);
                    return "שגיאה בקבלת תוכן התגובה מה-AI.";
                }

                // רישום: סיום מוצלח
                _logger.LogDebug("Successfully received and parsed AI response.");

                return content;
            }
            catch (HttpRequestException ex) when (ex.Message.Contains("401"))
            {
                // טיפול ספציפי בשגיאת אימות (API Key לא תקין)
                _logger.LogCritical(ex, "API Key is invalid or expired. Cannot connect to OpenAI.");
                throw new Bl.Exceptions.KeyNotAvailableException("המפתח אינו תקין או פג תוקף.");
            }
            catch (Bl.Exceptions.QuotaExceededException)
            {
                // מכסה נוצלה – מחזירים הודעה ידידותית במקום להפיל הכל
                _logger.LogWarning("Quota exceeded – returning fallback message.");
                return "המכסה של שירות ה-AI נוצלה. אין אפשרות לקבל תשובה כרגע.";
            }
            catch (HttpRequestException ex)
            {
                // רישום: שגיאת תקשורת כללית
                _logger.LogError(ex, "HTTP Request Error during communication with OpenAI.");
                throw new Exception($"שגיאה בתקשורת עם OpenAI: {ex.Message}");
            }
            catch (Exception ex)
            {
                // רישום: שגיאת פענוח או שגיאה לא צפויה
                _logger.LogError(ex, "Unexpected error or JSON parsing failure during OpenAI response processing.");
                throw new Exception("שגיאה בפענוח תגובת OpenAI או שגיאה בלתי צפויה.");
            }
        }
    }
}
