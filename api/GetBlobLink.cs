using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.Extensions.Configuration;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace Resume;
public static class GetBlobLink
{
  [FunctionName("GetBlobLink")]
  public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
      ILogger log,
      ExecutionContext context)
  {
    log.LogInformation("GetBlobLink HTTP trigger function processed a request.");

    try
    {
      string cName = req.Query["cname"];
      string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
      dynamic data = JsonConvert.DeserializeObject(requestBody);
      cName = cName ?? data?.cname;

      var config = new ConfigurationBuilder()
              .SetBasePath(context.FunctionAppDirectory)
              .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
              .AddEnvironmentVariables()
              .Build();
      string blobConnection = config["AzureWebJobsStorage"];
      string container = $"resume-{cName}";
      BlobContainerClient containerClient = new BlobContainerClient(blobConnection, container);

      if (containerClient.Exists())
      {
        var blobLink = $"https://{containerClient.AccountName}.blob.core.windows.net/{container}";
        log.LogInformation("Link sent: " + blobLink);
        return new OkObjectResult(new { link = blobLink });
      }
      else
      {
        return new NotFoundResult();
      }
    }
    catch
    {
      return new BadRequestResult();
    }
  }
}
