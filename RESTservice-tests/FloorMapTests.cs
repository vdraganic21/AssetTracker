namespace ApiTests;

using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;
using ApiTests.Models;

public class FloorMapTests : IAsyncLifetime
{
    private readonly HttpClient _client;

    public FloorMapTests()
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
    public async Task CreateFloorMap_ShouldReturnCreated()
    {
        var newFloorMap = new FloorMap
        {
            Id = 0,
            Name = "Test FloorMap",
            ImageBase64 = "base64string"
        };

        var postResponse = await _client.PostAsJsonAsync("/floormaps", newFloorMap);
        Assert.Equal(HttpStatusCode.Created, postResponse.StatusCode);
    }

    [Fact]
    public async Task GetAllFloorMaps_ShouldReturnOk()
    {
        var getResponse = await _client.GetAsync("/floormaps");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
    }

    [Fact]
    public async Task GetFloorMapById_ShouldReturnOk()
    {
        var newFloorMap = new FloorMap
        {
            Id = 0,
            Name = "Test FloorMap",
            ImageBase64 = "base64string"
        };

        var postResponse = await _client.PostAsJsonAsync("/floormaps", newFloorMap);
        var createdFloorMap = await postResponse.Content.ReadFromJsonAsync<FloorMap>();
        int floorMapId = createdFloorMap.Id;

        var getResponse = await _client.GetAsync($"/floormaps/{floorMapId}");
        Assert.Equal(HttpStatusCode.OK, getResponse.StatusCode);
    }

    [Fact]
    public async Task UpdateFloorMap_ShouldReturnOk()
    {
        var newFloorMap = new FloorMap
        {
            Id = 0,
            Name = "Test FloorMap",
            ImageBase64 = "base64string"
        };

        var postResponse = await _client.PostAsJsonAsync("/floormaps", newFloorMap);
        var createdFloorMap = await postResponse.Content.ReadFromJsonAsync<FloorMap>();
        int floorMapId = createdFloorMap.Id;

        var updatedFloorMap = new FloorMap
        {
            Id = floorMapId,
            Name = "Updated FloorMap",
            ImageBase64 = "updatedbase64string"
        };

        var putResponse = await _client.PutAsJsonAsync($"/floormaps/{floorMapId}", updatedFloorMap);
        Assert.Equal(HttpStatusCode.OK, putResponse.StatusCode);
    }

    [Fact]
    public async Task DeleteFloorMap_ShouldReturnNoContent()
    {
        var newFloorMap = new FloorMap
        {
            Id = 0,
            Name = "Test FloorMap",
            ImageBase64 = "base64string"
        };

        var postResponse = await _client.PostAsJsonAsync("/floormaps", newFloorMap);
        var createdFloorMap = await postResponse.Content.ReadFromJsonAsync<FloorMap>();
        int floorMapId = createdFloorMap.Id;

        var deleteResponse = await _client.DeleteAsync($"/floormaps/{floorMapId}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    }
} 