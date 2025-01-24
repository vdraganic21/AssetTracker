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

        public AssetSimulator(List<Asset> assets, List<Floorplan> floorplans, IAssetDataLoader loader)
        {
            Assets = assets;
            Floorplans = floorplans;
            RestLoader = loader ?? new RestApiAssetLoader(_apiBaseUrl);
        }

        public async Task<List<string>> SimulateNextStep(double speed)
        {
            var result = new List<string>();
            Console.WriteLine($"[DEBUG] Starting SimulateNextStep with {Assets.Count} assets, RestLoader type: {RestLoader?.GetType().Name ?? "null"}");

            foreach (var asset in Assets)
            {
                asset.MoveTowardNextPosition(speed);

                try 
                {
                    await SendAssetDataToRestService(asset);
                    Console.WriteLine($"[DEBUG] Successfully sent asset data for Asset {asset.AssetId}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[DEBUG] Error sending asset data: {ex.Message}");
                }

                try 
                {
                    await SendPositionHistoryToRestService(asset);
                    Console.WriteLine($"[DEBUG] Successfully sent position history for Asset {asset.AssetId}");
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"[DEBUG] Error sending position history: {ex.Message}");
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
                Console.WriteLine($"[DEBUG] Sending asset data for Asset {asset.AssetId} using {restLoader.GetType().Name}");
                var assetData = new AssetData
                {
                    Id = asset.AssetId,
                    Name = $"Asset {asset.AssetId}",
                    FloorMapId = asset.FloorplanId,
                    X = asset.X,
                    Y = asset.Y,
                    Active = true
                };

                var json = JsonSerializer.Serialize(assetData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await restLoader.SendRequestAsync(HttpMethod.Put, $"assets/{asset.AssetId}", content);
                Console.WriteLine($"[DEBUG] Asset data response: {response.StatusCode}");

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Successfully sent data for Asset ID: {asset.AssetId}");
                }
                else
                {
                    Console.WriteLine($"Failed to send data for Asset ID: {asset.AssetId}. Status Code: {response.StatusCode}");
                }
            }
            else
            {
                Console.WriteLine($"[DEBUG] RestLoader is not RestApiAssetLoader, it is {RestLoader?.GetType().Name ?? "null"}");
            }
        }

        private async Task SendPositionHistoryToRestService(Asset asset)
        {
            if (RestLoader is RestApiAssetLoader restLoader)
            {
                Console.WriteLine($"[DEBUG] Sending position history for Asset {asset.AssetId} using {restLoader.GetType().Name}");
                var positionHistory = new
                {
                    AssetId = asset.AssetId,
                    FloorMapId = asset.FloorplanId,
                    Timestamp = DateTime.UtcNow.ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
                    X = asset.X,
                    Y = asset.Y
                };

                var json = JsonSerializer.Serialize(positionHistory);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await restLoader.SendRequestAsync(HttpMethod.Post, "assetPositionHistory", content);
                Console.WriteLine($"[DEBUG] Position history response: {response.StatusCode}");

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Successfully sent position history for Asset ID: {asset.AssetId}");
                }
                else
                {
                    Console.WriteLine($"Failed to send position history for Asset ID: {asset.AssetId}. Status Code: {response.StatusCode}");
                }
            }
            else
            {
                Console.WriteLine($"[DEBUG] RestLoader is not RestApiAssetLoader, it is {RestLoader?.GetType().Name ?? "null"}");
            }
        }
    }
}
