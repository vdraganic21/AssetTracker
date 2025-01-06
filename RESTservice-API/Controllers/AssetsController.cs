using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Models;
using RESTservice_API.Data;

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
        var assets = _repository.GetAllAssets();
        return Ok(assets);
    }

    [HttpGet("{id}")]
    public IActionResult GetAssetById(int id)
    {
        var asset = _repository.GetAssetById(id);
        if (asset == null) return NotFound();
        return Ok(asset);
    }

    [HttpPost]
    public IActionResult CreateAsset([FromBody] Asset asset)
    {
        _repository.AddAsset(asset);
        _repository.SaveChanges();
        return CreatedAtAction(nameof(GetAssetById), new { id = asset.Id }, asset);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAsset(int id, [FromBody] Asset updatedAsset)
    {
        var asset = _repository.GetAssetById(id);
        if (asset == null) return NotFound();

        asset.Name = updatedAsset.Name;
        asset.X = updatedAsset.X;
        asset.Y = updatedAsset.Y;
        asset.Active = updatedAsset.Active;

        _repository.SaveChanges();
        return Ok(asset);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAsset(int id)
    {
        var asset = _repository.GetAssetById(id);
        if (asset == null) return NotFound();

        _repository.DeleteAsset(id);
        _repository.SaveChanges();
        return NoContent();
    }

    [HttpDelete("reset")]
    public IActionResult ResetAssets()
    {
        _repository.ResetAssets();
        return Ok();
    }
}
