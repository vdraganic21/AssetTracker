using RESTservice_API.Models;

namespace RESTservice_API.Data
{
    public interface IFloorMapRepository
    {
        IEnumerable<FloorMap> GetAllFloorMaps();
        FloorMap GetFloorMapById(int id);
        void AddFloorMap(FloorMap floorMap);
        void UpdateFloorMap(FloorMap floorMap);
        void DeleteFloorMap(int id);
        void SaveChanges();
    }
}
