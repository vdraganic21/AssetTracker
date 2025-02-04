using RESTservice_API.Models;

namespace RESTservice_API.Interfaces
{
    public interface IZoneRepository
    {
        Task<IEnumerable<Zone>> GetAllZonesAsync();
        Task<Zone?> GetZoneByIdAsync(int id);
        Task<IEnumerable<Zone>> GetZonesByFloorMapIdAsync(int floorMapId);
        Task<Zone> CreateZoneAsync(Zone zone);
        Task<Zone?> UpdateZoneAsync(int id, Zone zone);
        Task<bool> DeleteZoneAsync(int id);
    }
}
