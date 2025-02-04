using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;

namespace RESTservice_API.Interfaces
{
    public interface IFloorMapRepository
    {
        Task<IEnumerable<FloorMapDetailsDTO>> GetAllFloorMaps();
        FloorMap GetFloorMapById(int id);
        Task<FloorMapDetailsDTO> GetFloorMapDetailsAsync(int id);
        void AddFloorMap(FloorMap floorMap);
        void UpdateFloorMap(FloorMap floorMap);
        void DeleteFloorMap(int id);    
        void SaveChanges();
        void ResetFloorMaps();
        IEnumerable<Asset> GetAssetsByFloorMapId(int floorMapId);
        void UpdateAssets(IEnumerable<Asset> assets);
    }
}
