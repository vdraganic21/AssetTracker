using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Models;
using RESTservice_API.Interfaces;
using RESTservice_API.Models.DTOs;

namespace RESTservice_API.Controllers
{
    [Route("assetZoneHistory")]
    [ApiController]
    public class AssetZoneHistoryController : ControllerBase
    {
        private readonly IAssetZoneHistoryRepository _assetZoneHistoryRepository;

        public AssetZoneHistoryController(IAssetZoneHistoryRepository assetZoneHistoryRepository)
        {
            _assetZoneHistoryRepository = assetZoneHistoryRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AssetZoneHistoryDTO>>> GetHistory(
            [FromQuery] int? assetId = null,
            [FromQuery] int? zoneId = null,
            [FromQuery] string? entryStartTime = null,
            [FromQuery] string? entryEndTime = null,
            [FromQuery] string? exitStartTime = null,
            [FromQuery] string? exitEndTime = null,
            [FromQuery] int? minRetentionTime = null,
            [FromQuery] int? maxRetentionTime = null)
        {
            var queryParams = new AssetZoneHistoryQueryParams
            {
                AssetId = assetId,
                ZoneId = zoneId,
                MinRetentionTime = minRetentionTime,
                MaxRetentionTime = maxRetentionTime
            };

            // Parse datetime strings with flexible formats and convert to UTC
            if (!string.IsNullOrEmpty(entryStartTime) && 
                DateTimeOffset.TryParse(entryStartTime, out var parsedEntryStartTime))
            {
                queryParams.EntryStartTime = parsedEntryStartTime.UtcDateTime;
            }

            if (!string.IsNullOrEmpty(entryEndTime) && 
                DateTimeOffset.TryParse(entryEndTime, out var parsedEntryEndTime))
            {
                queryParams.EntryEndTime = parsedEntryEndTime.UtcDateTime;
            }

            if (!string.IsNullOrEmpty(exitStartTime) && 
                DateTimeOffset.TryParse(exitStartTime, out var parsedExitStartTime))
            {
                queryParams.ExitStartTime = parsedExitStartTime.UtcDateTime;
            }

            if (!string.IsNullOrEmpty(exitEndTime) && 
                DateTimeOffset.TryParse(exitEndTime, out var parsedExitEndTime))
            {
                queryParams.ExitEndTime = parsedExitEndTime.UtcDateTime;
            }

            var history = await _assetZoneHistoryRepository.GetAssetZoneHistoryAsync(queryParams);
            return Ok(history);
        }
    }
}
