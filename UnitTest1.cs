namespace ApiTests;

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

public class Asset
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int FloorMapId { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
    public bool Active { get; set; }
}

public class AssetPositionHistory
{
    public int Id { get; set; }
    public int AssetId { get; set; }
    public int FloorMapId { get; set; }
    public DateTime Timestamp { get; set; }
    public double X { get; set; }
    public double Y { get; set; }
}


public class ApiCrudTests : IAsyncLifetime
{
    private readonly HttpClient _client;

    public ApiCrudTests()
    {
        _client = new HttpClient(new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
        })
        {
            BaseAddress = new Uri("https://localhost:7018")
        };
    }

    public Task InitializeAsync() => Task.CompletedTask;

    public Task DisposeAsync()
    {
        _client.Dispose();
        return Task.CompletedTask;
    }

    [Fact]
    public async Task AssetsCrudOperations_ShouldWorkProperly()
    {
        // 1. Create a new asset (POST)
        var newAsset = new Asset
        {
            Id = 0,
            Name = "Test Asset",
            FloorMapId = 1,
            X = 100,
            Y = 200,
            Active = true
        };

        var postResponse = await _client.PostAsJsonAsync("/assets", newAsset);
        Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);

        var createdAsset = await postResponse.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(createdAsset); 

        Console.WriteLine($"Created Asset Name: {createdAsset.Name}");

        int assetId = createdAsset.Id;


        // 2. Read the created asset (GET)
        var getResponse = await _client.GetAsync($"/assets/{assetId}");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);

        var fetchedAsset = await getResponse.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(fetchedAsset);
        Assert.Equal("Test Asset", fetchedAsset.Name);

        // 3. Update the asset (PUT)
        var updatedAsset = new Asset
        {
            Id = assetId,
            Name = "Updated Asset",
            FloorMapId = 2,
            X = 300,
            Y = 400,
            Active = false
        };

        var putResponse = await _client.PutAsJsonAsync($"/assets/{assetId}", updatedAsset);
        Assert.Equal(HttpStatusCode.OK, putResponse.StatusCode);

        var getUpdatedResponse = await _client.GetAsync($"/assets/{assetId}");
        Assert.Equal(HttpStatusCode.OK, getUpdatedResponse.StatusCode);

        var updatedFetchedAsset = await getUpdatedResponse.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(updatedFetchedAsset);
        Assert.Equal("Updated Asset", updatedFetchedAsset.Name);

        // 4. Delete the asset (DELETE)
        var deleteResponse = await _client.DeleteAsync($"/assets/{assetId}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        var getAfterDeleteResponse = await _client.GetAsync($"/assets/{assetId}");
        Assert.Equal(HttpStatusCode.NotFound, getAfterDeleteResponse.StatusCode);
    }


    [Fact]
    public async Task AssetPositionHistoryCrudOperations_ShouldWorkProperly()
    {
        // 1. Create a new position history entry (POST)
        var newPosition = new AssetPositionHistory
        {
            Id = 0,
            AssetId = 1,
            FloorMapId = 1,
            Timestamp = DateTime.UtcNow,
            X = 500,
            Y = 600
        };

        var postResponse = await _client.PostAsJsonAsync("/assetPositionHistory", newPosition);
        Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);

        var createdPosition = await postResponse.Content.ReadFromJsonAsync<AssetPositionHistory>();
        Assert.NotNull(createdPosition); 

        Console.WriteLine($"Created Position: {createdPosition.X}, {createdPosition.Y}");

        int positionId = createdPosition.Id;

        // 2. Read the position history entry (GET)
        var getResponse = await _client.GetAsync($"/assetPositionHistory/{positionId}");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);

        var fetchedPosition = await getResponse.Content.ReadFromJsonAsync<AssetPositionHistory>();
        Assert.NotNull(fetchedPosition);
        Assert.Equal(500, fetchedPosition.X);
        Assert.Equal(600, fetchedPosition.Y);

        // 3. Delete the position history entry (DELETE)
        var deleteResponse = await _client.DeleteAsync($"/assetPositionHistory/{positionId}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        var getAfterDeleteResponse = await _client.GetAsync($"/assetPositionHistory/{positionId}");
        Assert.Equal(HttpStatusCode.NotFound, getAfterDeleteResponse.StatusCode);
    }
}
