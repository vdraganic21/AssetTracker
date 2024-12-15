using RESTservice_API.Data;
using RESTservice_API.Models;
using System.Linq;

public class MockAssetRepository : IAssetRepository
{
    private List<Asset> _assets;
    private readonly List<Asset> mockAssetList = new List<Asset>()
    {
        new Asset { Id = 1, Name = "Asset 1", X = 100, Y = 200, Active = true },
        new Asset { Id = 2, Name = "Asset 2", X = 150, Y = 250, Active = false }
    };

    public MockAssetRepository()
    {
        // Clone the mock data when the repository is initialized
        _assets = CloneAssetList(mockAssetList);
    }

    public void Reset()
    {
        // Clone the original data again during reset
        _assets = CloneAssetList(mockAssetList);
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

    private List<Asset> CloneAssetList(List<Asset> originalList)
    {
        // Create a new copy of the list
        return originalList.Select(a => new Asset
        {
            Id = a.Id,
            Name = a.Name,
            X = a.X,
            Y = a.Y,
            Active = a.Active
        }).ToList();
    }
}
