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
            [FromQuery] DateTime? startTime = null,
            [FromQuery] DateTime? endTime = null,
            [FromQuery] int? minRetentionTime = null,
            [FromQuery] int? maxRetentionTime = null)
        {
            var queryParams = new AssetZoneHistoryQueryParams
            {
                AssetId = assetId,
                ZoneId = zoneId,
                StartTime = startTime,
                EndTime = endTime,
                MinRetentionTime = minRetentionTime,
                MaxRetentionTime = maxRetentionTime
            };

            var history = await _assetZoneHistoryRepository.GetAssetZoneHistoryAsync(queryParams);
            return Ok(history);
        }
    }
}
