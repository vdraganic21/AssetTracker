using Microsoft.EntityFrameworkCore;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;

namespace RESTservice_API.Data
{
    public class ZoneRepository : IZoneRepository
    {
        private readonly ApplicationDbContext _context;

        public ZoneRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Zone>> GetAllZonesAsync()
        {
            return await _context.Zones.ToListAsync();
        }

        public async Task<Zone?> GetZoneByIdAsync(int id)
        {
            return await _context.Zones.FindAsync(id);
        }

        public async Task<IEnumerable<Zone>> GetZonesByFloorMapIdAsync(int floorMapId)
        {
            return await _context.Zones
                .Where(z => z.FloorMapId == floorMapId)
                .ToListAsync();
        }

        public async Task<Zone> CreateZoneAsync(Zone zone)
        {
            _context.Zones.Add(zone);
            await _context.SaveChangesAsync();
            return zone;
        }

        public async Task<Zone?> UpdateZoneAsync(int id, Zone zone)
        {
            var existingZone = await _context.Zones.FindAsync(id);
            if (existingZone == null)
                return null;

            existingZone.Name = zone.Name;
            existingZone.FloorMapId = zone.FloorMapId;
            existingZone.Points = zone.Points;

            await _context.SaveChangesAsync();
            return existingZone;
        }

        public async Task<bool> DeleteZoneAsync(int id)
        {
            var zone = await _context.Zones.FindAsync(id);
            if (zone == null)
                return false;

            _context.Zones.Remove(zone);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
