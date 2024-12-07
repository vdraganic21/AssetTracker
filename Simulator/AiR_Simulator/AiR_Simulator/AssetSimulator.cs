using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace AssetDataSimulator
{
    public class AssetSimulator
    {
        public List<IoTAsset> Assets { get; }

        public AssetSimulator(List<IoTAsset> assets)
        {
            Assets = assets;
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
