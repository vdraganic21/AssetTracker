using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Data;
using RESTservice_API.Models;

[ApiController]
[Route("assets")]
public class AssetsController : ControllerBase
{
    private readonly IAssetRepository _repository;

    public AssetsController(IAssetRepository repository)
    {
        _repository = repository;
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
    public IActionResult UpdateAsset(int id, [FromBody] Asset updatedAsset)
    {
        try
        {
            var asset = _repository.GetAssetById(id);
            if (asset == null) return NotFound($"Asset with ID {id} not found.");

            asset.Name = updatedAsset.Name;
            asset.X = updatedAsset.X;
            asset.Y = updatedAsset.Y;
            asset.Active = updatedAsset.Active;

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
}
