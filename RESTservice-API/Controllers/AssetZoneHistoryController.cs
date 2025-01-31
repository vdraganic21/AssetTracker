using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;

namespace RESTservice_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetZoneHistoryController : ControllerBase
    {
        private readonly IAssetZoneHistoryRepository _assetZoneHistoryRepository;

        public AssetZoneHistoryController(IAssetZoneHistoryRepository assetZoneHistoryRepository)
        {
            _assetZoneHistoryRepository = assetZoneHistoryRepository;
        }

        [HttpPost("entry")]
        public async Task<ActionResult<AssetZoneHistory>> RecordZoneEntry([FromBody] AssetZoneEntry entry)
        {
            var result = await _assetZoneHistoryRepository.CreateZoneEntryAsync(
                entry.AssetId,
                entry.ZoneId,
                entry.EnterTime
            );
            return Ok(result);
        }

        [HttpPost("exit")]
        public async Task<ActionResult<AssetZoneHistory>> RecordZoneExit([FromBody] AssetZoneExit exit)
        {
            var result = await _assetZoneHistoryRepository.RecordZoneExitAsync(
                exit.AssetId,
                exit.ZoneId,
                exit.ExitTime
            );

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        [HttpGet("{assetId}")]
        public async Task<ActionResult<IEnumerable<AssetZoneHistory>>> GetAssetHistory(int assetId, [FromQuery] int? zoneId = null)
        {
            var history = await _assetZoneHistoryRepository.GetAssetZoneHistoryAsync(assetId, zoneId);
            return Ok(history);
        }
    }

    public class AssetZoneEntry
    {
        public int AssetId { get; set; }
        public int ZoneId { get; set; }
        public DateTime EnterTime { get; set; }
    }

    public class AssetZoneExit
    {
        public int AssetId { get; set; }
        public int ZoneId { get; set; }
        public DateTime ExitTime { get; set; }
    }
}
