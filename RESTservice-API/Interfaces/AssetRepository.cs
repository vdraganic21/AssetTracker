using RESTservice_API.Data;
using RESTservice_API.Models;

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
    }

    public void UpdateAsset(Asset asset)
    {
        _context.Assets.Update(asset);
    }

    public void DeleteAsset(int id)
    {
        var asset = _context.Assets.Find(id);
        if (asset != null)
        {
            _context.Assets.Remove(asset);
        }
    }

    public void SaveChanges()
    {
        _context.SaveChanges();
    }

    public void Reset()
    {
        // Not implemented
    }
}
