using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Resume;
public static class ReadBlob
{
  [FunctionName("ReadBlob")]
  public static async Task<IActionResult> Run(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
      ILogger log,
      ExecutionContext context)
  {
    log.LogInformation("C# HTTP trigger function processed a request.");
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
      var links = new List<BlobData>();

      foreach (BlobHierarchyItem item in containerClient.GetBlobsByHierarchy())
      {
        var name = item.Blob.Name.Remove(item.Blob.Name.LastIndexOf("."));
        var bdata = new BlobData
        {
          Name = name,
          Link = $"https://{containerClient.AccountName}.blob.core.windows.net/{container}/{item.Blob.Name}"
        };
        log.LogInformation("Name:" + bdata.Name);
        links.Add(bdata);
      }
      var linksJson = JsonConvert.SerializeObject(links);
      return new OkObjectResult(links);
    }
    catch
    {
      return new NotFoundResult();
    }
  }
}
