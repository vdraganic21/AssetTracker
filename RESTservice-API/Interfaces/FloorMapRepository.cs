using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using RESTservice_API.Interfaces;
using RESTservice_API.Data;

public class FloorMapRepository : IFloorMapRepository
{
    private readonly ApplicationDbContext _context;

    public FloorMapRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FloorMapDetailsDTO>> GetAllFloorMaps()
    {
        var floorMaps = await _context.FloorMaps
            .Include(f => f.Assets)
            .Include(f => f.Zones)
            .ToListAsync();

        return floorMaps.Select(floorMap => new FloorMapDetailsDTO
        {
            Id = floorMap.Id,
            Name = floorMap.Name,
            ImageBase64 = floorMap.ImageBase64,
            Assets = floorMap.Assets?.ToList(),
            Zones = floorMap.Zones?.Select(z => new Zone 
            { 
                Id = z.Id, 
                Name = z.Name, 
                Points = z.Points 
            }).ToList()
        }).Select(dto => dto.ConvertZonesToSquares());
    }

    public async Task<FloorMapDetailsDTO> GetFloorMapDetailsAsync(int id)
    {
        var floorMap = await _context.FloorMaps
            .Include(f => f.Assets)
            .Include(f => f.Zones)
            .FirstOrDefaultAsync(f => f.Id == id);

        if (floorMap == null)
            return null;

        return new FloorMapDetailsDTO
        {
            Id = floorMap.Id,
            Name = floorMap.Name,
            ImageBase64 = floorMap.ImageBase64,
            Assets = floorMap.Assets?.ToList(),
            Zones = floorMap.Zones?.Select(z => new Zone 
            { 
                Id = z.Id, 
                Name = z.Name, 
                Points = z.Points 
            }).ToList()
        }.ConvertZonesToSquares();
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
            _context.FloorMaps.Attach(floorMap);
            _context.Entry(floorMap).State = EntityState.Modified;
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

    public void ResetFloorMaps()
    {
        // Database doesn't support this
    }

    public IEnumerable<Asset> GetAssetsByFloorMapId(int floorMapId)
{
    var assets = _context.Assets
        .Where(a => a.FloorMapId == floorMapId)
        .ToList();

    return assets;
}

    public void UpdateAssets(IEnumerable<Asset> assets)
    {
        foreach (var asset in assets)
        {
            var existingAsset = _context.Assets.Find(asset.Id);
            if (existingAsset != null)
            {
                existingAsset.Active = asset.Active;
            }
        }
        SaveChanges();
    }
}
