using RESTservice_API.Data;
using RESTservice_API.Models;
using System.Collections.Generic;
using System.Linq;

public class AssetRepository : IAssetRepository
{
    private readonly ApplicationDbContext _context;

    public AssetRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Asset> GetAllAssets()
    {
        return _context.Assets.ToList();
    }

    public Asset GetAssetById(int id)
    {
        return _context.Assets.Find(id);
    }

    public void AddAsset(Asset asset)
    {
        _context.Assets.Add(asset);
        SaveChanges();
    }

    public void UpdateAsset(Asset asset)
    {
        _context.Assets.Update(asset);
        SaveChanges();
    }

    public void DeleteAsset(int id)
    {
        var asset = _context.Assets.Find(id);
        if (asset != null)
        {
            _context.Assets.Remove(asset);
            SaveChanges();
        }
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }

    public void ResetAssets()
    {
        // Database doesn't support this
    }
}
