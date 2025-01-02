using RESTservice_API.Data;
using RESTservice_API.Models;

public class MockAssetRepository : IAssetRepository
{
    private readonly List<Asset> _assets;

    public MockAssetRepository()
    {
        _assets = new List<Asset>
        {
            new Asset { Id = 1, Name = "Asset 1", FloorMapId = 1, X = 10, Y = 10, Active = true },
            new Asset { Id = 2, Name = "Asset 2", FloorMapId = 1, X = 20, Y = 20, Active = false },
            new Asset { Id = 3, Name = "Asset 3", FloorMapId = 2, X = 30, Y = 30, Active = true },
            new Asset { Id = 4, Name = "Asset 4", FloorMapId = 1, X = 15, Y = 15, Active = true }
        };
    }

    public IEnumerable<Asset> GetAllAssets()
    {
        return _assets;
    }

    public Asset GetAssetById(int id)
    {
        return _assets.FirstOrDefault(a => a.Id == id);
    }

    public void AddAsset(Asset asset)
    {
        if (_assets.Any(a => a.Id == asset.Id))
        {
            throw new InvalidOperationException($"Asset with ID {asset.Id} already exists.");
        }

        _assets.Add(asset);
    }

    public void UpdateAsset(Asset asset)
    {
        var existingAsset = _assets.FirstOrDefault(a => a.Id == asset.Id);
        if (existingAsset != null)
        {
            existingAsset.Name = asset.Name;
            existingAsset.X = asset.X;
            existingAsset.Y = asset.Y;
            existingAsset.Active = asset.Active;
            existingAsset.FloorMapId = asset.FloorMapId;
        }
        else
        {
            _assets.Add(asset);
        }
    }

    public void DeleteAsset(int id)
    {
        var asset = _assets.FirstOrDefault(a => a.Id == id);
        if (asset != null)
        {
            _assets.Remove(asset);
        }
    }

    public void SaveChanges()
    {
        // Simulate saving changes to mock data (no-op)
    }
}
