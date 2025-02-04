using System;
using System.Collections.Generic;
using System.Globalization;
using AiR_Simulator.Entities;
using AiR_Simulator.DataAccess;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace AssetDataSimulator
{
    public class AssetSimulator
    {
        private readonly string _apiBaseUrl = "https://localhost:7018";
        public List<Asset> Assets { get; }
        public List<Floorplan> Floorplans { get; }
        public IAssetDataLoader RestLoader { get; private set; }
        private int historyStoreCount = 0;

        public AssetSimulator(List<Asset> assets, List<Floorplan> floorplans, IAssetDataLoader loader)
        {
            Assets = assets;
            Floorplans = floorplans;
            RestLoader = loader ?? new RestApiAssetLoader(_apiBaseUrl);
        }

        public async Task<List<string>> SimulateNextStep(double speed)
        {
            var result = new List<string>();
            historyStoreCount++;
            foreach (var asset in Assets)
            {
                if (asset.Positions != null && asset.Positions.Count > 1)
                {
                    asset.MoveTowardNextPosition(speed);
                }

                try
                {
                    await SendAssetDataToRestService(asset);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Error sending asset data: {ex.Message}");
                }

                    try
                    {
                        await SendPositionHistoryToRestService(asset);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error sending position history: {ex.Message}");
                    }

                var floorplanName = GetFloorplanForAsset(asset);
                result.Add($"{{\"asset_id\":{asset.AssetId},\"x\":{asset.X.ToString(CultureInfo.InvariantCulture)},\"y\":{asset.Y.ToString(CultureInfo.InvariantCulture)},\"floorplan\":\"{floorplanName}\",\"status\":\"active\",\"timestamp\":\"{DateTime.UtcNow:yyyy-MM-ddTHH:mm:ss.fffZ}\"}}");
            }

            return result;
        }

        private string GetFloorplanForAsset(Asset asset)
        {
            var floorplan = Floorplans.Find(fp => fp.FloorplanId == asset.FloorplanId);
            return floorplan?.Name ?? "Unknown";
        }

        private async Task SendAssetDataToRestService(Asset asset)
        {
            if (RestLoader is RestApiAssetLoader restLoader)
            {
                var response = await restLoader.SendRequestAsync(HttpMethod.Get, $"assets/{asset.AssetId}", null);

                if (!response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Failed to fetch latest asset data for Asset ID: {asset.AssetId}. Status Code: {response.StatusCode}");
                    return;
                }

                var jsonResponse = await response.Content.ReadAsStringAsync();
                var latestAssetData = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonResponse);

                if (latestAssetData == null)
                {
                    Console.WriteLine($"Failed to deserialize latest asset data for Asset ID: {asset.AssetId}");
                    return;
                }

                latestAssetData["x"] = asset.X;
                latestAssetData["y"] = asset.Y;

                var updatedJson = JsonSerializer.Serialize(latestAssetData);
                var content = new StringContent(updatedJson, Encoding.UTF8, "application/json");

                var putResponse = await restLoader.SendRequestAsync(HttpMethod.Put, $"assets/{asset.AssetId}", content);

                if (putResponse.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Successfully updated position for Asset ID: {asset.AssetId}");
                }
                else
                {
                    Console.WriteLine($"Failed to update position for Asset ID: {asset.AssetId}. Status Code: {putResponse.StatusCode}");
                }
            }
        }


        private async Task SendPositionHistoryToRestService(Asset asset)
        {
            if (RestLoader is RestApiAssetLoader restLoader)
            {
                var positionHistoryData = new 
                {
                    AssetId = asset.AssetId,
                    FloorMapId = asset.FloorplanId,
                    DateTime = DateTime.UtcNow,
                    DateOfMovement = DateTime.UtcNow.ToString("yyyy-MM-dd"),
                    X = Math.Round(asset.X, 2),
                    Y = Math.Round(asset.Y, 2)
                };

                var json = JsonSerializer.Serialize(positionHistoryData, new JsonSerializerOptions 
                { 
                    WriteIndented = true,
                    PropertyNamingPolicy = null
                });
                
                Console.WriteLine($"Sending position history for Asset ID {asset.AssetId}:");
                Console.WriteLine(json);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                try 
                {
                    var postResponse = await restLoader.SendRequestAsync(HttpMethod.Post, "assetPositionHistory", content);

                    if (postResponse.IsSuccessStatusCode)
                    {
                        Console.WriteLine($"Successfully sent updated position history for Asset ID: {asset.AssetId}");
                    }
                    else
                    {
                        var responseBody = await postResponse.Content.ReadAsStringAsync();
                        Console.WriteLine($"Failed to send position history for Asset ID: {asset.AssetId}");
                        Console.WriteLine($"Status Code: {postResponse.StatusCode}");
                        Console.WriteLine($"Response Body: {responseBody}");
                        Console.WriteLine($"Request Payload: {json}");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Exception when sending position history for Asset ID: {asset.AssetId}");
                    Console.WriteLine($"Exception Message: {ex.Message}");
                    Console.WriteLine($"Exception StackTrace: {ex.StackTrace}");
                }
            }
        }

    }
}
