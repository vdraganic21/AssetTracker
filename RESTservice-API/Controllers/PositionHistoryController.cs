using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using RESTservice_API.Models;
using RESTservice_API.Data;


[ApiController]
[Route("assetPositionHistory")]
public class PositionHistoryController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PositionHistoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetPositionHistory([FromQuery] int? assetId, [FromQuery] int? floorMapId, [FromQuery] DateTime? startDate, [FromQuery] DateTime? endDate)
    {
        var query = _context.PositionHistories.AsQueryable();

        if (assetId.HasValue) query = query.Where(p => p.AssetId == assetId.Value);
        if (floorMapId.HasValue) query = query.Where(p => p.FloorMapId == floorMapId.Value);
        if (startDate.HasValue && endDate.HasValue) query = query.Where(p => p.Timestamp >= startDate && p.Timestamp <= endDate);

        return Ok(query.ToList());
    }

    [HttpPost]
    public IActionResult CreatePositionHistory([FromBody] PositionHistory positionHistory)
    {
        _context.PositionHistories.Add(positionHistory);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetPositionHistory), new { id = positionHistory.Id }, positionHistory);
    }

    [HttpGet("{id}")]
    public IActionResult GetPositionHistoryById(int id)
    {
        var history = _context.PositionHistories.Find(id);
        if (history == null) return NotFound();
        return Ok(history);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePositionHistory(int id)
    {
        var history = _context.PositionHistories.Find(id);
        if (history == null) return NotFound();

        _context.PositionHistories.Remove(history);
        _context.SaveChanges();
        return NoContent();
    }
}
