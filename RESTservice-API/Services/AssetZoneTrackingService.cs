using RESTservice_API.Interfaces;
using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Logging;

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
                _logger.LogInformation($"Checking zone {zone.Id} ({zone.Name}) with points: {zone.Points}");
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
            try
            {
                var points = JsonSerializer.Deserialize<Point[]>(zone.Points);
                if (points == null || points.Length < 3)
                {
                    _logger.LogWarning($"Invalid points array for zone {zone.Id}: {zone.Points}");
                    return false;
                }

                _logger.LogInformation($"Checking point ({x}, {y}) against {points.Length} zone points");
                bool inside = false;
                int j = points.Length - 1;

                for (int i = 0; i < points.Length; i++)
                {
                    if (((points[i].y > y) != (points[j].y > y)) &&
                        (x < (points[j].x - points[i].x) * (y - points[i].y) / (points[j].y - points[i].y) + points[i].x))
                    {
                        inside = !inside;
                    }
                    j = i;
                }

                return inside;
            }
            catch (JsonException)
            {
                _logger.LogError($"Failed to deserialize points for zone {zone.Id}: {zone.Points}");
                return false;
            }
        }
    }

    public class Point
    {
        [JsonPropertyName("x")]
        public double x { get; set; }

        [JsonPropertyName("y")]
        public double y { get; set; }
    }
}