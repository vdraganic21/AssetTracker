using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace AssetDataSimulator
{
    public class AssetSimulator
    {
        public List<IoTAsset> Assets { get; }

        public AssetSimulator(string jsonFilePath)
        {
            Assets = LoadAssetsFromJsonFile(jsonFilePath);
        }

        private List<IoTAsset> LoadAssetsFromJsonFile(string jsonFilePath)
        {
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine($"JSON file {jsonFilePath} not found.");
                return new List<IoTAsset>();
            }

            var jsonData = File.ReadAllText(jsonFilePath);
            var assetDataList = JsonSerializer.Deserialize<List<AssetJson>>(jsonData);

            var assets = new List<IoTAsset>();
            foreach (var assetData in assetDataList)
            {
                var positions = new List<(double X, double Y)>();
                foreach (var position in assetData.Positions)
                {
                    positions.Add((position.X, position.Y));
                }

                assets.Add(new IoTAsset(assetData.AssetId, positions));
            }

            return assets;
        }

        public List<string> SimulateNextStep(double speed)
        {
            var result = new List<string>();

            foreach (var asset in Assets)
            {
                asset.MoveTowardNextPosition(speed);

                result.Add($"{{\"asset_id\":{asset.AssetId},\"x\":{asset.X},\"y\":{asset.Y},\"status\":\"active\",\"timestamp\":\"{DateTime.UtcNow:yyyy-MM-ddTHH:mm:ss.fffZ}\"}}");
            }

            return result;
        }
    }
}
