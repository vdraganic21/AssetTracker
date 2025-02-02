using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RESTservice_API.Data
{
    public class MockPositionHistoryRepository : IPositionHistoryRepository
    {
        private List<PositionHistory> _positionHistories;
        private readonly List<PositionHistory> _mockPositionHistories;
        private int _currentId = 2;

        public MockPositionHistoryRepository()
        {
            _mockPositionHistories = new List<PositionHistory>
            {
                new PositionHistory { Id = 1, AssetId = 1, FloorMapId = 1, X = 100, Y = 200, Timestamp = DateTime.Now },
                new PositionHistory { Id = 2, AssetId = 2, FloorMapId = 1, X = 150, Y = 250, Timestamp = DateTime.Now }
            };

            _positionHistories = new List<PositionHistory>(_mockPositionHistories);
        }

        public IEnumerable<PositionHistory> GetAllPositionHistories()
        {
            return _positionHistories;
        }

        public IEnumerable<PositionHistory> GetPositionHistoryById(int assetId)
        {
            return _positionHistories
                   .Where(ph => ph.AssetId == assetId)
                   .ToList();
        }

        public IEnumerable<PositionHistory> GetFilteredPositionHistories(PositionHistoryQueryParams queryParams)
        {
            var query = _positionHistories.AsQueryable();

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
            _positionHistories.Add(positionHistory);
        }

        public void DeletePositionHistory(int id)
        {
            var positionHistory = _positionHistories.FirstOrDefault(ph => ph.Id == id);
            if (positionHistory != null)
            {
                _positionHistories.Remove(positionHistory);
            }
        }

        public void ResetPositionHistories()
        {
            _positionHistories = new List<PositionHistory>(_mockPositionHistories);
        }
    }
}
