using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using AiR_Simulator.Entities;
using AiR_Simulator.DataAccess;

namespace AiR_Simulator.DataAccess
{
    public class JsonFileAssetLoader : IAssetDataLoader
    {
        private readonly string _jsonFilePath;

        public JsonFileAssetLoader(string jsonFilePath)
        {
            _jsonFilePath = jsonFilePath;
        }

        public async Task<(List<Asset>, List<Floorplan>)> LoadDataAsync()
        {
            try
            {
                string jsonContent = File.ReadAllText(_jsonFilePath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var assetDataList = JsonSerializer.Deserialize<List<AssetJsonObject>>(jsonContent, options);
                
                var assets = new List<Asset>();
                foreach (var assetData in assetDataList)
                {
                    var positions = assetData.Positions.Select(p => (p.X, p.Y)).ToList();
                    var asset = new Asset(assetData.AssetId, positions);
                    assets.Add(asset);
                }

                return (assets, new List<Floorplan>());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading JSON file: {ex.Message}");
                throw;
            }
        }

        private class AssetJsonObject
        {
            public int AssetId { get; set; }
            public List<PositionJsonObject> Positions { get; set; }
        }

        private class PositionJsonObject
        {
            public double X { get; set; }
            public double Y { get; set; }
        }
    }
}