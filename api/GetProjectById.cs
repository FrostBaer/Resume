using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace Resume;
public static class GetProjectById
{
  [FunctionName("GetProjectById")]
  public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "GetProjectById/{id}")] HttpRequest req,
      [CosmosDB(
            databaseName: "Resume",
            containerName: "projects",
            Connection = "CosmosDBConnectionString",
            Id = "{id}",
            PartitionKey = "{id}")] Project project,
      ILogger log)
  {
    log.LogInformation("C# HTTP trigger function processed a request.");

    if (project == null)
    {
      log.LogInformation("Project not found");
      return new NotFoundResult();
    }
    else
    {
      log.LogInformation("Found project");
      return new OkObjectResult(project);
    }
  }
}
