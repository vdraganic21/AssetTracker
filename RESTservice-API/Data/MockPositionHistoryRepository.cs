using RESTservice_API.Models;
using System.Collections.Generic;
using System.Linq;

namespace RESTservice_API.Data
{
    public class MockPositionHistoryRepository : IPositionHistoryRepository
    {
        private List<PositionHistory> _positionHistories;
        private int _currentId = 2;

        public MockPositionHistoryRepository()
        {
            _mockPositionHistories = new List<PositionHistory>
            {
                new PositionHistory { Id = 1, AssetId = 1, X = 100, Y = 200, Timestamp = DateTime.Now },
                new PositionHistory { Id = 2, AssetId = 2, X = 150, Y = 250, Timestamp = DateTime.Now }
            };

            _positionHistories = new List<PositionHistory>(_mockPositionHistories);
        }

        public IEnumerable<PositionHistory> GetAllPositionHistories()
        {
            return _positionHistories;
        }

        public PositionHistory GetPositionHistoryById(int id)
        {
            return _positionHistories.FirstOrDefault(ph => ph.Id == id);
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
