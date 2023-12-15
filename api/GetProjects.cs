using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Net.Http;
using Microsoft.Azure.Cosmos;
using System.Linq;
using System.Collections.Generic;

namespace Resume
{
    public static class GetProjects
    {

        [FunctionName("GetProjects")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "Resume",
                containerName: "projects",
                Connection = "CosmosDBConnectionString")] CosmosClient client,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            Container container = client.GetDatabase("Resume").GetContainer("projects");

            FeedResponse<Project> response = null;

            QueryDefinition queryDefinition = new QueryDefinition(
                "SELECT * FROM items i order by i.date desc");
            using (FeedIterator<Project> resultSet = container.GetItemQueryIterator<Project>(queryDefinition))
            {
                while (resultSet.HasMoreResults)
                {
                    response = await resultSet.ReadNextAsync();
                    Project item = response.First();      
                    log.LogInformation(item.Name);         
                }
            }

            return new OkObjectResult(new { Projects = response });
        }
    }
}
