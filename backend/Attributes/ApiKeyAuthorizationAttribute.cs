using System;
using Microsoft.AspNetCore.Mvc;
using sharedia.Filters;

namespace sharedia.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ApiKeyAuthorizationAttribute : TypeFilterAttribute
    {
        public ApiKeyAuthorizationAttribute() : base(typeof(ApiKeyAuthorization))
        {
        }
    }
}