using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace sharedia.Filters
{
    public class ApiKeyAuthorization : IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (!context.HttpContext.Request.Headers.TryGetValue("ApiKey", out var retrievedApiKey))
            {
                context.Result = new ObjectResult( new { message = "ApiKey header missing from request", status = 401 } );
            }

            var configuration = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
            var apiKey = configuration.GetValue<string>("ApiKey");

            if (!retrievedApiKey.Equals(apiKey))
            {
                context.Result = new ObjectResult( new { message = "ApiKey is not valid", status = 401 } );
            }
        }
    }
}