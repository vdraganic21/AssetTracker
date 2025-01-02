using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Data;
using RESTservice_API.Models;

[ApiController]
[Route("assetPositionHistory")]
public class PositionHistoryController : ControllerBase
{
    private readonly IPositionHistoryRepository _repository;

    public PositionHistoryController(IPositionHistoryRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public IActionResult GetPositionHistories()
    {
        try
        {
            var positionHistories = _repository.GetAllPositionHistories();
            return Ok(positionHistories);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving position histories: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving position histories.");
        }
    }

    [HttpPost]
    public IActionResult CreatePositionHistory([FromBody] PositionHistory positionHistory)
    {
        try
        {
            _repository.AddPositionHistory(positionHistory);
            return CreatedAtAction(nameof(GetPositionHistories), new { id = positionHistory.Id }, positionHistory);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating position history: {ex.Message}");
            return StatusCode(500, "An error occurred while creating the position history.");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetPositionHistoryById(int id)
    {
        try
        {
            var history = _repository.GetPositionHistoryById(id);
            if (history == null) return NotFound($"PositionHistory with ID {id} not found.");
            return Ok(history);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving position history: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving position history.");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePositionHistory(int id)
    {
        try
        {
            _repository.DeletePositionHistory(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting position history: {ex.Message}");
            return StatusCode(500, "An error occurred while deleting position history.");
        }
    }
}
