using Microsoft.AspNetCore.Http;

namespace ServerApi.Helpers
{
    public static class Extentions
    {
        public static void AddApplicationException(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message.Replace("\n", "").Replace("\r", ""));
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
        }
    }
}