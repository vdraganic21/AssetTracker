using RESTservice_API.Models;
using System.Collections.Generic;

namespace RESTservice_API.Data
{
    public interface IAssetRepository
    {
        IEnumerable<Asset> GetAllAssets();
        Asset GetAssetById(int id);
        void AddAsset(Asset asset);
        void UpdateAsset(Asset asset);
        void DeleteAsset(int id);
        void SaveChanges();
        void Reset();
    }
}
