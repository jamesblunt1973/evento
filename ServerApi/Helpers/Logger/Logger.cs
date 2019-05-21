using System;
using System.Threading.Tasks;
using ServerApi.Data;
using ServerApi.Models.DomainModels;

namespace ServerApi.Helpers.Logger
{
    public class Logger : ILogger
    {
        private readonly DataContext dataContext;

        public Logger(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task LogDebug(string userId, string message, ApplicationEvents e)
        {
            await Log((int)LogLevels.Debug, userId, message, e);
        }

        public async Task LogException(string userId, string message, ApplicationEvents e)
        {
            await Log((int)LogLevels.Exception, userId, message, e);
        }

        public async Task LogFatal(string userId, string message, ApplicationEvents e)
        {
            await Log((int)LogLevels.Fatal, userId, message, e);
        }

        public async Task LogInformation(string userId, string message, ApplicationEvents e)
        {
            await Log((int)LogLevels.Information, userId, message, e);
        }

        public async Task LogWarning(string userId, string message, ApplicationEvents e)
        {
            await Log((int)LogLevels.Warning, userId, message, e);
        }

        private async Task Log(int logLevel, string userId, string message, ApplicationEvents e)
        {
            await dataContext.Logs.AddAsync(new Log()
            {
                EventDate = DateTime.Now,
                EventId = (int)e,
                LogLevel = logLevel,
                Message = message,
                UserId = userId
            });
            await dataContext.SaveChangesAsync();
        }
    }
}