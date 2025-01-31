using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;

namespace RESTservice_API.Interfaces
{
    public interface IAssetZoneHistoryRepository
    {
        Task<AssetZoneHistoryDTO> CreateZoneEntryAsync(int assetId, int zoneId, DateTime enterTime);
        Task<AssetZoneHistoryDTO?> RecordZoneExitAsync(int assetId, int zoneId, DateTime exitTime);
        Task<IEnumerable<AssetZoneHistoryDTO>> GetAssetZoneHistoryAsync(AssetZoneHistoryQueryParams queryParams);
    }
}
