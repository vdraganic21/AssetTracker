using AiR_Simulator.Entities;
using AssetDataSimulator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Linq;
using System.Threading.Tasks;

namespace AiR_Simulator.DataAccess
{
    public static class AssetJsonLoader
    {
        public static async Task<(List<Asset>, List<Floorplan>)> LoadDataAsync(string _jsonFilePath)
        {
            try
            {
                Console.WriteLine($"Loading from JSON file: {Path.GetFullPath(_jsonFilePath)}");
                if (!File.Exists(_jsonFilePath))
                {
                    throw new Exception($"JSON file not found at: {Path.GetFullPath(_jsonFilePath)}");
                }

                string jsonContent = File.ReadAllText(_jsonFilePath);
                Console.WriteLine($"JSON content (first 200 chars): {jsonContent.Substring(0, Math.Min(200, jsonContent.Length))}");

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var jsonData = JsonSerializer.Deserialize<JsonData>(jsonContent, options);
                if (jsonData?.Floorplans == null)
                {
                    throw new Exception("Failed to deserialize JSON data or Floorplans is null");
                }

                Console.WriteLine($"Found {jsonData.Floorplans.Count} floorplans in JSON");

                var assets = new List<Asset>();
                var floorplans = new List<Floorplan>();
                int floorplanIdCounter = 1;

                foreach (var floorplanData in jsonData.Floorplans)
                {
                    var floorplan = new Floorplan(floorplanData.FloorplanName)
                    {
                        FloorplanId = floorplanIdCounter++,
                        Assets = new List<Asset>()
                    };

                    foreach (var assetData in floorplanData.Assets)
                    {
                        var positions = assetData.Positions.Select(p => (p.X, p.Y)).ToList();
                        var asset = new Asset(assetData.AssetId, positions)
                        {
                            FloorplanId = floorplan.FloorplanId
                        };
                        floorplan.Assets.Add(asset);
                        assets.Add(asset);
                    }

                    floorplans.Add(floorplan);
                }

                return (assets, floorplans);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading JSON file: {ex.Message}");
                throw;
            }
        }

        public static void LoadPaths(string jsonFilePath, List<Asset> assets)
        {
            Console.WriteLine($"Attempting to load paths from: {Path.GetFullPath(jsonFilePath)}");
            
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine($"JSON paths file not found at: {Path.GetFullPath(jsonFilePath)}");
                return;
            }

            try
            {
                var jsonData = File.ReadAllText(jsonFilePath);
                Console.WriteLine($"Read JSON data (first 100 chars): {jsonData.Substring(0, Math.Min(100, jsonData.Length))}");
                
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };
                
                var assetPaths = JsonSerializer.Deserialize<List<AssetJsonObject>>(jsonData, options);
                Console.WriteLine($"Deserialized {assetPaths?.Count ?? 0} asset paths");

                if (assetPaths == null || assetPaths.Count == 0)
                {
                    Console.WriteLine("No path data found in the JSON file.");
                    return;
                }

                Console.WriteLine($"Current assets count: {assets.Count}");
                Console.WriteLine("Asset IDs in memory: " + string.Join(", ", assets.Select(a => a.AssetId)));
                Console.WriteLine("Asset IDs in JSON: " + string.Join(", ", assetPaths.Select(a => a.AssetId)));

                var assetDict = assets.ToDictionary(a => a.AssetId);

                foreach (var assetPath in assetPaths)
                {
                    Console.WriteLine($"Processing path for asset {assetPath.AssetId}");
                    if (assetDict.TryGetValue(assetPath.AssetId, out var asset))
                    {
                        var positions = assetPath.Positions
                            .Select(p => (p.X, p.Y))
                            .ToList();
                        
                        Console.WriteLine($"Setting path for asset {assetPath.AssetId} with {positions.Count} positions");
                        Console.WriteLine($"Path points: {string.Join(", ", positions.Select(p => $"({p.X},{p.Y})"))}");
                        asset.SetPath(positions);
                    }
                    else
                    {
                        Console.WriteLine($"Asset {assetPath.AssetId} not found in loaded assets");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading paths from JSON file: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
            }
        }

        private class FloorplanJsonObject
        {
            public string FloorplanName { get; set; }
            public List<AssetJsonObject> Assets { get; set; }
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

        private class JsonData
        {
            public List<FloorplanJsonObject> Floorplans { get; set; }
        }
    }
}
