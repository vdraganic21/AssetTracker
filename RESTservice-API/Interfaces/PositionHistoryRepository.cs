using RESTservice_API.Data;
using RESTservice_API.Models;

public class PositionHistoryRepository : IPositionHistoryRepository
{
    private readonly ApplicationDbContext _context;

    public PositionHistoryRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public IEnumerable<PositionHistory> GetAllPositionHistories()
    {
        try
        {
            return _context.PositionHistories.ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving position histories: {ex.Message}");
            throw new InvalidOperationException("An error occurred while retrieving position histories.");
        }
    }

    public PositionHistory GetPositionHistoryById(int id)
    {
        try
        {
            var history = _context.PositionHistories.Find(id);
            if (history == null)
                throw new KeyNotFoundException($"PositionHistory with ID {id} not found.");
            return history;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving position history by ID: {ex.Message}");
            throw new InvalidOperationException("An error occurred while retrieving position history.");
        }
    }

    public void AddPositionHistory(PositionHistory positionHistory)
    {
        try
        {
            _context.PositionHistories.Add(positionHistory);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error adding position history: {ex.Message}");
            throw new InvalidOperationException("An error occurred while adding position history.");
        }
    }

    public void DeletePositionHistory(int id)
    {
        try
        {
            var positionHistory = _context.PositionHistories.Find(id);
            if (positionHistory == null)
                throw new KeyNotFoundException($"PositionHistory with ID {id} not found.");
            _context.PositionHistories.Remove(positionHistory);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting position history: {ex.Message}");
            throw new InvalidOperationException("An error occurred while deleting position history.");
        }
    }
}
