using RESTservice_API.Models;
using System.Collections.Generic;

namespace RESTservice_API.Data
{
    public interface IPositionHistoryRepository
    {
        IEnumerable<PositionHistory> GetAllPositionHistories();
        PositionHistory GetPositionHistoryById(int id);
        void AddPositionHistory(PositionHistory positionHistory);
        void DeletePositionHistory(int id);
    }
}
