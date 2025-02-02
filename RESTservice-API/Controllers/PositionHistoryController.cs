using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Data;
using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using RESTservice_API.Services;
using System;

[ApiController]
[Route("assetPositionHistory")]
public class PositionHistoryController : ControllerBase
{
    private readonly IPositionHistoryRepository _repository;
    private readonly AssetZoneTrackingService _zoneTrackingService;

    public PositionHistoryController(
        IPositionHistoryRepository repository,
        AssetZoneTrackingService zoneTrackingService)
    {
        _repository = repository;
        _zoneTrackingService = zoneTrackingService;
    }

    [HttpGet]
    public IActionResult GetPositionHistories(
        [FromQuery] int? floorMapId = null,
        [FromQuery] int? assetId = null,
        [FromQuery] DateTime? startDate = null,
        [FromQuery] DateTime? endDate = null)
    {
        try
        {
            var queryParams = new PositionHistoryQueryParams
            {
                FloorMapId = floorMapId,
                AssetId = assetId,
                StartDate = startDate,
                EndDate = endDate
            };

            var positionHistories = _repository.GetFilteredPositionHistories(queryParams);
            return Ok(positionHistories);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving position histories: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving position histories.");
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreatePositionHistory([FromBody] PositionHistory positionHistory)
    {
        try
        {
            _repository.AddPositionHistory(positionHistory);
            
            await _zoneTrackingService.ProcessPositionUpdate(positionHistory);
            
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

    [HttpDelete("reset")]
    public IActionResult ResetPositionHistories()
    {
        _repository.ResetPositionHistories();
        return Ok();
    }
}
