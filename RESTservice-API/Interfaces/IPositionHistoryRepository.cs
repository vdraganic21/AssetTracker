using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System.Collections.Generic;

namespace RESTservice_API.Data
{
    public interface IPositionHistoryRepository
    {
        IEnumerable<PositionHistory> GetAllPositionHistories();
        IEnumerable<PositionHistory> GetPositionHistoryById(int id);
        IEnumerable<PositionHistory> GetFilteredPositionHistories(PositionHistoryQueryParams queryParams);
        void AddPositionHistory(PositionHistory positionHistory);
        void DeletePositionHistory(int id);
        void ResetPositionHistories();
    }
}
