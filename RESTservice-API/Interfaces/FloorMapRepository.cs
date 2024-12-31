using RESTservice_API.Data;
using RESTservice_API.Models;

public class FloorMapRepository : IFloorMapRepository
{
    private readonly ApplicationDbContext _context;

    public FloorMapRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<FloorMap> GetAllFloorMaps()
    {
        return _context.FloorMaps.ToList();
    }

    public FloorMap GetFloorMapById(int id)
    {
        return _context.FloorMaps.Find(id);
    }

    public void AddFloorMap(FloorMap floorMap)
    {
        _context.FloorMaps.Add(floorMap);
        SaveChanges();
    }

    public void UpdateFloorMap(FloorMap floorMap)
    {
        var existingFloorMap = _context.FloorMaps.Find(floorMap.Id);
        if (existingFloorMap != null)
        {
            existingFloorMap.Name = floorMap.Name;
            existingFloorMap.ImageBase64 = floorMap.ImageBase64;
            SaveChanges(); 
        }
    }

    public void DeleteFloorMap(int id)
    {
        var floorMap = _context.FloorMaps.Find(id);
        if (floorMap != null)
        {
            _context.FloorMaps.Remove(floorMap);
            SaveChanges();
        }
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }
}
