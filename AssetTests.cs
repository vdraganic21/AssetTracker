namespace ApiTests;

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using ApiTests.Models;

public class AssetTests : IAsyncLifetime
{
    private readonly HttpClient _client;

    public AssetTests()
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
        await ResetAssetsState();
    }

    public Task DisposeAsync()
    {
        _client.Dispose();
        return Task.CompletedTask;
    }

    private async Task ResetAssetsState()
    {
        var response = await _client.DeleteAsync("/assets/reset");
        if (response.StatusCode != HttpStatusCode.OK)
        {
            throw new Exception("Failed to reset assets.");
        }
    }

    [Fact]
    public async Task CreateAsset_ShouldReturnCreated()
    {
        var newAsset = new Asset
        {
            Name = "Test Asset",
            FloorMapId = 1,
            X = 100,
            Y = 200,
            Active = true
        };

        var response = await _client.PostAsJsonAsync("/assets", newAsset);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);

        var createdAsset = await response.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(createdAsset);
        Assert.Equal("Test Asset", createdAsset.Name);
    }

    [Fact]
    public async Task GetAsset_ShouldReturnAsset_WhenItExists()
    {
        var newAsset = new Asset
        {
            Name = "Test Asset",
            FloorMapId = 1,
            X = 100,
            Y = 200,
            Active = true
        };

        var postResponse = await _client.PostAsJsonAsync("/assets", newAsset);
        var createdAsset = await postResponse.Content.ReadFromJsonAsync<Asset>();

        var getResponse = await _client.GetAsync($"/assets/{createdAsset.Id}");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);

        var fetchedAsset = await getResponse.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(fetchedAsset);
        Assert.Equal(createdAsset.Id, fetchedAsset.Id);
    }

    [Fact]
    public async Task UpdateAsset_ShouldReturnNoContent()
    {
        var newAsset = new Asset
        {
            Name = "Test Asset",
            FloorMapId = 1,
            X = 100,
            Y = 200,
            Active = true
        };

        var postResponse = await _client.PostAsJsonAsync("/assets", newAsset);
        var createdAsset = await postResponse.Content.ReadFromJsonAsync<Asset>();

        var updatedAsset = new Asset
        {
            Id = createdAsset.Id,
            Name = "Updated Asset",
            FloorMapId = 2,
            X = 300,
            Y = 400,
            Active = false
        };

        var putResponse = await _client.PutAsJsonAsync($"/assets/{createdAsset.Id}", updatedAsset);
        Assert.Equal(HttpStatusCode.OK, putResponse.StatusCode);

        var getResponse = await _client.GetAsync($"/assets/{createdAsset.Id}");
        var fetchedUpdatedAsset = await getResponse.Content.ReadFromJsonAsync<Asset>();
        Assert.NotNull(fetchedUpdatedAsset);
        Assert.Equal("Updated Asset", fetchedUpdatedAsset.Name);
    }

    [Fact]
    public async Task DeleteAsset_ShouldReturnNoContent()
    {
        var newAsset = new Asset
        {
            Name = "Test Asset",
            FloorMapId = 1,
            X = 100,
            Y = 200,
            Active = true
        };

        var postResponse = await _client.PostAsJsonAsync("/assets", newAsset);
        var createdAsset = await postResponse.Content.ReadFromJsonAsync<Asset>();

        var deleteResponse = await _client.DeleteAsync($"/assets/{createdAsset.Id}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);

        var getResponse = await _client.GetAsync($"/assets/{createdAsset.Id}");
        Assert.Equal(HttpStatusCode.NotFound, getResponse.StatusCode);
    }
}
