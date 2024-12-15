using RESTservice_API.Models;
using RESTservice_API.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            // Ensure that this method returns IEnumerable<PositionHistory>
            return _context.PositionHistories.ToList();  // This should return a List<PositionHistory> which is an IEnumerable<PositionHistory>
        }

        public PositionHistory GetPositionHistoryById(int id)
        {
            return _context.PositionHistories.Find(id);
        }

        public void AddPositionHistory(PositionHistory positionHistory)
        {
            _context.PositionHistories.Add(positionHistory);
            _context.SaveChanges();
        }

        public void DeletePositionHistory(int id)
        {
            var positionHistory = _context.PositionHistories.Find(id);
            if (positionHistory != null)
            {
                _context.PositionHistories.Remove(positionHistory);
                _context.SaveChanges();
            }
        }

        public void Reset()
        {
            // Not implemented
        }
    }
}
