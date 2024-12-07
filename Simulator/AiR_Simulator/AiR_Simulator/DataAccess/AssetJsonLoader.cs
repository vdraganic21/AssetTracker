using AssetDataSimulator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AiR_Simulator.DataAccess
{
    public static class AssetJsonLoader
    {
        public static List<IoTAsset> Load(string jsonFilePath)
        {
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine($"JSON file '{jsonFilePath}' not found.");
                return null;
            }

            try
            {
                var jsonData = File.ReadAllText(jsonFilePath);
                var assetDataList = JsonSerializer.Deserialize<List<AssetJson>>(jsonData);

                if (assetDataList == null || assetDataList.Count == 0)
                {
                    Console.WriteLine("JSON file is empty or contains invalid data.");
                    return null;
                }

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
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading or parsing JSON file: {ex.Message}");
                return null;
            }
        }
    }
}
