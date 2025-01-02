using System;
using System.Collections.Generic;
using System.Globalization;
using AiR_Simulator.Entities;
using AiR_Simulator.DataAccess;
using System.Threading.Tasks;

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

        public List<string> SimulateNextStep(double speed)
        {
            var result = new List<string>();

            foreach (var asset in Assets)
            {
                asset.MoveTowardNextPosition(speed);

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
    }
}
