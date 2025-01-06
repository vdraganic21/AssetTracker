using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using RESTservice_API.Models;
using RESTservice_API.Data;

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
        var positionHistories = _repository.GetAllPositionHistories();
        return Ok(positionHistories);
    }
    [HttpPost]
    public IActionResult CreatePositionHistory([FromBody] PositionHistory positionHistory)
    {
        _repository.AddPositionHistory(positionHistory);
        return CreatedAtAction(nameof(GetPositionHistories), new { id = positionHistory.Id }, positionHistory);
    }

    [HttpGet("{id}")]
    public IActionResult GetPositionHistoryById(int id)
    {
        var history = _repository.GetPositionHistoryById(id);
        if (history == null) return NotFound();
        return Ok(history);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePositionHistory(int id)
    {
        _repository.DeletePositionHistory(id);
        return NoContent();
    }

    [HttpDelete("reset")]
    public IActionResult ResetPositionHistories()
    {
        _repository.ResetPositionHistories();
        return Ok();
    }
}
