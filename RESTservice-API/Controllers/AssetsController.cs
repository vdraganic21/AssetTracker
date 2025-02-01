using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Data;
using RESTservice_API.Models;
using RESTservice_API.Services;
using RESTservice_API.Models.DTOs;

[ApiController]
[Route("assets")]
public class AssetsController : ControllerBase
{
    private readonly IAssetRepository _repository;
    private readonly AssetZoneTrackingService _zoneTrackingService;

    public AssetsController(
        IAssetRepository repository,
        AssetZoneTrackingService zoneTrackingService)
    {
        _repository = repository;
        _zoneTrackingService = zoneTrackingService;
    }

    [HttpGet]
    public IActionResult GetAssets()
    {
        try
        {
            var assets = _repository.GetAllAssets();
            return Ok(assets);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving assets: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving the assets.");
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetAssetById(int id)
    {
        try
        {
            var asset = _repository.GetAssetById(id);
            if (asset == null) return NotFound($"Asset with ID {id} not found.");
            return Ok(asset);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error retrieving asset: {ex.Message}");
            return StatusCode(500, "An error occurred while retrieving the asset.");
        }
    }

    [HttpPost]
    public IActionResult CreateAsset([FromBody] Asset asset)
    {
        try
        {
            _repository.AddAsset(asset);
            _repository.SaveChanges();
            return CreatedAtAction(nameof(GetAssetById), new { id = asset.Id }, asset);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Error creating asset: {ex.Message}");
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error creating asset: {ex.Message}");
            return StatusCode(500, "An error occurred while creating the asset.");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateAsset(int id, [FromBody] Asset updatedAsset)
    {
        try
        {
            var asset = _repository.GetAssetById(id);
            if (asset == null) return NotFound($"Asset with ID {id} not found.");

            // Create a position history entry for zone tracking
            var positionUpdate = new PositionHistory
            {
                AssetId = id,
                X = updatedAsset.X,
                Y = updatedAsset.Y,
                FloorMapId = updatedAsset.FloorMapId,
                Timestamp = DateTime.UtcNow
            };

            // Process zone tracking
            await _zoneTrackingService.ProcessPositionUpdate(positionUpdate);

            // Update asset properties
            asset.Name = updatedAsset.Name;
            asset.X = updatedAsset.X;
            asset.Y = updatedAsset.Y;
            asset.Active = updatedAsset.Active;
            asset.FloorMapId = updatedAsset.FloorMapId;

            _repository.SaveChanges();
            return Ok(asset);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error updating asset: {ex.Message}");
            return StatusCode(500, "An error occurred while updating the asset.");
        }
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAsset(int id)
    {
        try
        {
            var asset = _repository.GetAssetById(id);
            if (asset == null) return NotFound($"Asset with ID {id} not found.");

            _repository.DeleteAsset(id);
            _repository.SaveChanges();
            return NoContent();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting asset: {ex.Message}");
            return StatusCode(500, "An error occurred while deleting the asset.");
        }
    }

    [HttpDelete("reset")]
    public IActionResult ResetAssets()
    {
        _repository.ResetAssets();
        return Ok();
    }
}
