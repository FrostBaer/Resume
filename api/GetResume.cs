using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Resume
{
    public static class GetResume
    {
        [FunctionName("GetResume")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
            databaseName: "Resume",
            containerName: "resume",
            Connection = "CosmosDBConnectionString",
            Id = "0",
            PartitionKey = "0")] Resume resume,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (resume == null)
            {
                log.LogInformation("Resume not found");
                return new NotFoundResult();
            }
            else
            {
                log.LogInformation("Found Resume");
                return new OkObjectResult(resume);
            }
        }
    }
}
