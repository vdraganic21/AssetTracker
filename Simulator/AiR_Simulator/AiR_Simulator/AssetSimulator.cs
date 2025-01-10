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
        public List<Asset> Assets { get; }
        public List<Floorplan> Floorplans { get; }
        public IAssetDataLoader RestLoader { get; private set; }

        public AssetSimulator(List<Asset> assets, List<Floorplan> floorplans, IAssetDataLoader loader)
        {
            Assets = assets;
            Floorplans = floorplans;
            RestLoader = loader;
        }

        public async Task<List<string>> SimulateNextStep(double speed)
        {
            var result = new List<string>();

            foreach (var asset in Assets)
            {
                asset.MoveTowardNextPosition(speed);

                await SendAssetDataToRestService(asset);

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

        private static async Task SendAssetDataToRestService(Asset asset)
        {
            using (var httpClient = new HttpClient())
            {
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

                var response = await httpClient.PutAsync($"https://localhost:7018/assets/{asset.AssetId}", content);

                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"Successfully sent data for Asset ID: {asset.AssetId}");
                }
                else
                {
                    Console.WriteLine($"Failed to send data for Asset ID: {asset.AssetId}. Status Code: {response.StatusCode}");
                }
            }
        }
    }
}
