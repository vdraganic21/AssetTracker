using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RESTservice_API.Data
{
    public class PositionHistoryRepository : IPositionHistoryRepository
    {
        private readonly ApplicationDbContext _context;

        public PositionHistoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PositionHistory> GetAllPositionHistories()
        {
            return _context.PositionHistories.ToList();
        }

        public IEnumerable<PositionHistory> GetPositionHistoryById(int assetId)
        {
            return _context.PositionHistories
                       .Where(ph => ph.AssetId == assetId)
                       .ToList();
        }

        public IEnumerable<PositionHistory> GetFilteredPositionHistories(PositionHistoryQueryParams queryParams)
        {
            var query = _context.PositionHistories.AsQueryable();

            if (queryParams.FloorMapId.HasValue)
            {
                query = query.Where(ph => ph.FloorMapId == queryParams.FloorMapId.Value);
            }

            if (queryParams.AssetId.HasValue)
            {
                query = query.Where(ph => ph.AssetId == queryParams.AssetId.Value);
            }

            if (queryParams.StartDate.HasValue)
            {
                query = query.Where(ph => ph.Timestamp >= queryParams.StartDate.Value);
            }

            if (queryParams.EndDate.HasValue)
            {
                query = query.Where(ph => ph.Timestamp <= queryParams.EndDate.Value);
            }

            return query.ToList();
        }

        public void AddPositionHistory(PositionHistory positionHistory)
        {
            _context.PositionHistories.Add(positionHistory);
            _context.SaveChanges();
        }

        public void DeletePositionHistory(int id)
        {
            var positionHistory = _context.PositionHistories.FirstOrDefault(ph => ph.Id == id);
            if (positionHistory != null)
            {
                _context.PositionHistories.Remove(positionHistory);
                _context.SaveChanges();
            }
        }

        public void ResetPositionHistories()
        {
            var allHistories = _context.PositionHistories.ToList();
            _context.PositionHistories.RemoveRange(allHistories);
            _context.SaveChanges();
        }
    }
}
