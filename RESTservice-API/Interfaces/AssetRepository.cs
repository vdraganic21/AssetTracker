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
        try
        {
            return _context.Assets.ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving all assets: {ex.Message}");
            throw new InvalidOperationException("An error occurred while retrieving assets.");
        }
    }

    public Asset GetAssetById(int id)
    {
        try
        {
            var asset = _context.Assets.Find(id);
            if (asset == null)
                throw new KeyNotFoundException($"Asset with ID {id} not found.");
            return asset;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving asset by ID: {ex.Message}");
            throw new InvalidOperationException("An error occurred while retrieving the asset.");
        }
    }

    public void AddAsset(Asset asset)
    {
        try
        {
            _context.Assets.Add(asset);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding asset: {ex.Message}");
            throw new InvalidOperationException("An error occurred while adding the asset.");
        }
    }

    public void UpdateAsset(Asset asset)
    {
        try
        {
            _context.Assets.Update(asset);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating asset: {ex.Message}");
            throw new InvalidOperationException("An error occurred while updating the asset.");
        }
    }

    public void DeleteAsset(int id)
    {
        try
        {
            var asset = _context.Assets.Find(id);
            if (asset == null)
                throw new KeyNotFoundException($"Asset with ID {id} not found.");
            _context.Assets.Remove(asset);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting asset: {ex.Message}");
            throw new InvalidOperationException("An error occurred while deleting the asset.");
        }
    }

    public void SaveChanges()
    {
        try
        {
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error saving changes: {ex.Message}");
            throw new InvalidOperationException("An error occurred while saving changes.");
        }
    }
}
