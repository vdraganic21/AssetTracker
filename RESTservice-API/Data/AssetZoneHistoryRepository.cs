using Microsoft.EntityFrameworkCore;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;

namespace RESTservice_API.Data
{
    public class AssetZoneHistoryRepository : IAssetZoneHistoryRepository
    {
        private readonly ApplicationDbContext _context;

        public AssetZoneHistoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        private int CalculateRetentionTime(DateTime enterTime, DateTime exitTime)
        {
            var enterSeconds = ((DateTimeOffset)enterTime).ToUnixTimeSeconds();
            var exitSeconds = ((DateTimeOffset)exitTime).ToUnixTimeSeconds();
            return (int)(exitSeconds - enterSeconds);
        }

        public async Task<AssetZoneHistoryDTO> CreateZoneEntryAsync(int assetId, int zoneId, DateTime enterTime)
        {
            var existingEntry = await _context.AssetZoneHistory
                .Where(azh => azh.AssetId == assetId && azh.ZoneId == zoneId && azh.ExitDateTime == null)
                .FirstOrDefaultAsync();

            if (existingEntry != null)
            {
                existingEntry.ExitDateTime = enterTime;
                existingEntry.RetentionTime = CalculateRetentionTime(existingEntry.EnterDateTime, enterTime);
            }

            var newEntry = new AssetZoneHistory
            {
                AssetId = assetId,
                ZoneId = zoneId,
                EnterDateTime = enterTime,
                ExitDateTime = null,
                RetentionTime = null
            };

            _context.AssetZoneHistory.Add(newEntry);
            await _context.SaveChangesAsync();

            return await GetEntryWithRelatedData(newEntry.Id);
        }

        public async Task<AssetZoneHistoryDTO?> RecordZoneExitAsync(int assetId, int zoneId, DateTime exitTime)
        {
            var entry = await _context.AssetZoneHistory
                .Where(azh => azh.AssetId == assetId && azh.ZoneId == zoneId && azh.ExitDateTime == null)
                .OrderByDescending(azh => azh.EnterDateTime)
                .FirstOrDefaultAsync();

            if (entry == null)
                return null;

            entry.ExitDateTime = exitTime;
            entry.RetentionTime = CalculateRetentionTime(entry.EnterDateTime, exitTime);

            await _context.SaveChangesAsync();
            return await GetEntryWithRelatedData(entry.Id);
        }

        public async Task<IEnumerable<AssetZoneHistoryDTO>> GetAssetZoneHistoryAsync(AssetZoneHistoryQueryParams queryParams)
        {
            var query = _context.AssetZoneHistory.AsQueryable();

            if (queryParams.AssetId.HasValue)
            {
                query = query.Where(azh => azh.AssetId == queryParams.AssetId.Value);
            }

            if (queryParams.ZoneId.HasValue)
            {
                query = query.Where(azh => azh.ZoneId == queryParams.ZoneId.Value);
            }

            if (queryParams.EntryStartTime.HasValue)
            {
                query = query.Where(azh => azh.EnterDateTime >= queryParams.EntryStartTime.Value);
            }

            if (queryParams.EntryEndTime.HasValue)
            {
                query = query.Where(azh => azh.EnterDateTime <= queryParams.EntryEndTime.Value);
            }

            if (queryParams.ExitStartTime.HasValue)
            {
                query = query.Where(azh => azh.ExitDateTime.HasValue && azh.ExitDateTime >= queryParams.ExitStartTime.Value);
            }

            if (queryParams.ExitEndTime.HasValue)
            {
                query = query.Where(azh => azh.ExitDateTime.HasValue && azh.ExitDateTime <= queryParams.ExitEndTime.Value);
            }

            if (queryParams.MinRetentionTime.HasValue)
            {
                query = query.Where(azh => azh.RetentionTime >= queryParams.MinRetentionTime.Value);
            }

            if (queryParams.MaxRetentionTime.HasValue)
            {
                query = query.Where(azh => azh.RetentionTime <= queryParams.MaxRetentionTime.Value);
            }

            var results = await query.Include(azh => azh.Asset)
                             .Include(azh => azh.Zone)
                             .Select(azh => new AssetZoneHistoryDTO
                             {
                                 Id = azh.Id,
                                 AssetId = azh.AssetId,
                                 ZoneId = azh.ZoneId,
                                 EnterDateTime = azh.EnterDateTime,
                                 ExitDateTime = azh.ExitDateTime,
                                 RetentionTime = azh.RetentionTime,
                                 AssetName = azh.Asset.Name,
                                 ZoneName = azh.Zone.Name
                             }).ToListAsync();

            return results;
        }

        private async Task<AssetZoneHistoryDTO> GetEntryWithRelatedData(int id)
        {
            var entry = await _context.AssetZoneHistory
                .Include(azh => azh.Asset)
                .Include(azh => azh.Zone)
                .FirstOrDefaultAsync(azh => azh.Id == id);

            return new AssetZoneHistoryDTO
            {
                Id = entry.Id,
                AssetId = entry.AssetId,
                ZoneId = entry.ZoneId,
                EnterDateTime = entry.EnterDateTime,
                ExitDateTime = entry.ExitDateTime,
                RetentionTime = entry.RetentionTime,
                AssetName = entry.Asset?.Name,
                ZoneName = entry.Zone?.Name
            };
        }
    }
}
