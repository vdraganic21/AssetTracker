using System;
using System.Collections.Generic;
using System.Globalization;
using AiR_Simulator.Entities;

namespace AssetDataSimulator
{
    public class AssetSimulator
    {
        public List<Asset> Assets { get; }
        public List<Floorplan> Floorplans { get; }

        public AssetSimulator(List<Asset> assets, List<Floorplan> floorplans)
        {
            Assets = assets;
            Floorplans = floorplans;
        }

        public List<string> SimulateNextStep(double speed)
        {
            var result = new List<string>();

            foreach (var asset in Assets)
            {
                asset.MoveTowardNextPosition(speed);

                result.Add($"{{\"asset_id\":{asset.AssetId},\"x\":{asset.X.ToString(CultureInfo.InvariantCulture)},\"y\":{asset.Y.ToString(CultureInfo.InvariantCulture)},\"status\":\"active\",\"timestamp\":\"{DateTime.UtcNow:yyyy-MM-ddTHH:mm:ss.fffZ}\"}}");
            }

            return result;
        }
    }
}
