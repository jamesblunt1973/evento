using System.Threading.Tasks;

namespace ServerApi.Helpers.Logger
{
    public interface ILogger
    {
         Task LogDebug(string userId, string message, ApplicationEvents e);
         Task LogInformation(string userId, string message, ApplicationEvents e);
         Task LogWarning(string userId, string message, ApplicationEvents e);
         Task LogException(string userId, string message, ApplicationEvents e);
         Task LogFatal(string userId, string message, ApplicationEvents e);
    }
}