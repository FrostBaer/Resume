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
    public static class GetContactData
    {
        [FunctionName("GetContactData")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
            databaseName: "Resume",
            containerName: "contact",
            Connection = "CosmosDBConnectionString",
            Id = "0",
            PartitionKey = "0")] Contact contact,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            if (contact == null)
            {
                log.LogInformation("Contact not found");
                return new NotFoundResult();
            }
            else
            {
                log.LogInformation("Found contact for {}");
                return new OkObjectResult(contact);
            }
        }
    }
}
