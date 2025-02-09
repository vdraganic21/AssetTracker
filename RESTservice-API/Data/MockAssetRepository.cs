using RESTservice_API.Data;
using RESTservice_API.Models;

public class MockAssetRepository : IAssetRepository
{
    private List<Asset> _assets;
    private readonly List<Asset> _mockAssets;

    public MockAssetRepository()
    {
        _mockAssets = new List<Asset>
        {
            new Asset { Id = 1, Name = "Asset 1", FloorMapId = 1, X = 10, Y = 20, Active = true },
            new Asset { Id = 2, Name = "Asset 2", FloorMapId = 1, X = 15, Y = 25, Active = false },
            new Asset { Id = 3, Name = "Asset 3", FloorMapId = 2, X = 15, Y = 25, Active = true },
            new Asset { Id = 4, Name = "Asset 4", FloorMapId = 1, X = 30, Y = 30, Active = true }
        };

        _assets = new List<Asset>(_mockAssets);
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

    public void ResetAssets()
    {
        _assets = new List<Asset>(_mockAssets);
    }
}
