namespace ApiTests;

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using ApiTests.Models;

public class PositionHistoryTests : IAsyncLifetime
{
    private readonly HttpClient _client;

    public PositionHistoryTests()
    {
        _client = new HttpClient(new HttpClientHandler
        {
            ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => true
        })
        {
            BaseAddress = new Uri("https://localhost:7018")
        };
    }

    public async Task InitializeAsync()
    {
        await ResetPositionHistoryState();
    }

    public Task DisposeAsync()
    {
        _client.Dispose();
        return Task.CompletedTask;
    }

    private async Task ResetPositionHistoryState()
    {
        var response = await _client.DeleteAsync("/assetPositionHistory/reset");
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new Exception("Failed to reset position history.");
        }
    }

    [Fact]
    public async Task CreateAssetPositionHistory_ShouldReturnCreated()
    {
        var newPosition = new AssetPositionHistory
        {
            AssetId = 1,
            FloorMapId = 1,
            Timestamp = DateTime.UtcNow,
            X = 500,
            Y = 600
        };

        var response = await _client.PostAsJsonAsync("/assetPositionHistory", newPosition);
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var createdPosition = await response.Content.ReadFromJsonAsync<AssetPositionHistory>();
        Assert.NotNull(createdPosition);
        Assert.Equal(500, createdPosition.X);
        Assert.Equal(600, createdPosition.Y);
    }

    [Fact]
    public async Task DeleteAssetPositionHistory_ShouldReturnNoContent()
    {
        var newPosition = new AssetPositionHistory
        {
            AssetId = 1,
            FloorMapId = 1,
            Timestamp = DateTime.UtcNow,
            X = 500,
            Y = 600
        };

        var postResponse = await _client.PostAsJsonAsync("/assetPositionHistory", newPosition);
        var createdPosition = await postResponse.Content.ReadFromJsonAsync<AssetPositionHistory>();

        var deleteResponse = await _client.DeleteAsync($"/assetPositionHistory/{createdPosition.Id}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        var getResponse = await _client.GetAsync($"/assetPositionHistory/{createdPosition.Id}");
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
    }
}
