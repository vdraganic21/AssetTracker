using AiR_Simulator.Entities;
using AssetDataSimulator;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace AiR_Simulator.DataAccess
{
    public static class AssetJsonLoader
    {
        public static void Load(string jsonFilePath, ref List<Asset> assets, ref List<Floorplan> floorplans)
        {
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine("JSON file not found.");
                return;
            }

            try
            {
                var jsonData = File.ReadAllText(jsonFilePath);
                var floorplansData = JsonSerializer.Deserialize<List<FloorplanJsonObject>>(jsonData);

                if (floorplansData == null || floorplansData.Count == 0)
                {
                    Console.WriteLine("No floorplans found in the JSON file.");
                    return;
                }

                assets.Clear();
                floorplans.Clear();

                foreach (var floorplanData in floorplansData)
                {
                    var floorplan = new Floorplan(floorplanData.FloorplanName);

                    var assetList = new List<Asset>();
                    foreach (var assetData in floorplanData.Assets)
                    {
                        var positions = new List<(double X, double Y)>();
                        foreach (var position in assetData.Positions)
                        {
                            positions.Add((position.X, position.Y));
                        }

                        var asset = new Asset(assetData.AssetId, positions);
                        assetList.Add(asset);
                        assets.Add(asset);
                    }

                    floorplan.Assets = assetList;
                    floorplans.Add(floorplan);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading JSON file: {ex.Message}");
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
    }
}
