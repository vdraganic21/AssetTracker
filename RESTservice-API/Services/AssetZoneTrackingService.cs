using RESTservice_API.Interfaces;
using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RESTservice_API.Services
{
    public class AssetZoneTrackingService
    {
        private readonly IZoneRepository _zoneRepository;
        private readonly IAssetZoneHistoryRepository _assetZoneHistoryRepository;
        private readonly ILogger<AssetZoneTrackingService> _logger;

        public AssetZoneTrackingService(
            IZoneRepository zoneRepository,
            IAssetZoneHistoryRepository assetZoneHistoryRepository,
            ILogger<AssetZoneTrackingService> logger)
        {
            _zoneRepository = zoneRepository;
            _assetZoneHistoryRepository = assetZoneHistoryRepository;
            _logger = logger;
        }

        public async Task ProcessPositionUpdate(PositionHistory positionUpdate)
        {
            _logger.LogInformation($"Processing position update for asset {positionUpdate.AssetId} at ({positionUpdate.X}, {positionUpdate.Y})");
            
            var zones = await _zoneRepository.GetZonesByFloorMapIdAsync(positionUpdate.FloorMapId);
            _logger.LogInformation($"Found {zones.Count()} zones for floor map {positionUpdate.FloorMapId}");
            
            foreach (var zone in zones)
            {
                _logger.LogInformation($"Checking zone {zone.Id} ({zone.Name}) with points: {string.Join(", ", zone.Points.Select(p => $"({p.X}, {p.Y})"))}");
                bool isCurrentlyInZone = IsPointInZone(positionUpdate.X, positionUpdate.Y, zone);
                bool wasInZone = await WasAssetInZone(positionUpdate.AssetId, zone.Id);
                
                _logger.LogInformation($"Asset {positionUpdate.AssetId} is {(isCurrentlyInZone ? "inside" : "outside")} zone {zone.Id} " +
                                     $"and was {(wasInZone ? "inside" : "outside")} before");

                if (isCurrentlyInZone && !wasInZone)
                {
                    // Asset just entered the zone
                    _logger.LogInformation($"Asset {positionUpdate.AssetId} entered zone {zone.Id}");
                    await _assetZoneHistoryRepository.CreateZoneEntryAsync(positionUpdate.AssetId, zone.Id, positionUpdate.Timestamp);
                }
                else if (!isCurrentlyInZone && wasInZone)
                {
                    // Asset just left the zone
                    _logger.LogInformation($"Asset {positionUpdate.AssetId} left zone {zone.Id}");
                    await _assetZoneHistoryRepository.RecordZoneExitAsync(positionUpdate.AssetId, zone.Id, positionUpdate.Timestamp);
                }
            }
        }

        private async Task<bool> WasAssetInZone(int assetId, int zoneId)
        {
            // Get the most recent history entry for this asset and zone
            var queryParams = new AssetZoneHistoryQueryParams
            {
                AssetId = assetId,
                ZoneId = zoneId
            };

            var history = (await _assetZoneHistoryRepository.GetAssetZoneHistoryAsync(queryParams))
                .OrderByDescending(h => h.EnterDateTime)
                .FirstOrDefault();

            // Asset was in zone if there's an open entry (no exit time)
            return history != null && history.ExitDateTime == null;
        }

        private bool IsPointInZone(double x, double y, Zone zone)
        {
            if (zone.Points == null || zone.Points.Count < 3)
            {
                _logger.LogWarning($"Invalid points array for zone {zone.Id}: {zone.Points}");
                return false;
            }

            _logger.LogInformation($"Checking point ({x}, {y}) against {zone.Points.Count} zone points");
            bool inside = false;
            int j = zone.Points.Count - 1;

            for (int i = 0; i < zone.Points.Count; i++)
            {
                if (((zone.Points[i].Y > y) != (zone.Points[j].Y > y)) &&
                    (x < (zone.Points[j].X - zone.Points[i].X) * (y - zone.Points[i].Y) / (zone.Points[j].Y - zone.Points[i].Y) + zone.Points[i].X))
                {
                    inside = !inside;
                }
                j = i;
            }

            return inside;
        }
    }
}