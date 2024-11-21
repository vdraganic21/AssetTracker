using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Models;
using RESTservice_API.Data;


[ApiController]
[Route("assets")]
public class AssetsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AssetsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetAssets()
    {
        var assets = _context.Assets.ToList();
        return Ok(assets);
    }

    [HttpGet("{id}")]
    public IActionResult GetAssetById(int id)
    {
        var asset = _context.Assets.Find(id);
        if (asset == null) return NotFound();
        return Ok(asset);
    }

    [HttpPost]
    public IActionResult CreateAsset([FromBody] Asset asset)
    {
        _context.Assets.Add(asset);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetAssetById), new { id = asset.Id }, asset);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAsset(int id, [FromBody] Asset updatedAsset)
    {
        var asset = _context.Assets.Find(id);
        if (asset == null) return NotFound();

        asset.Name = updatedAsset.Name;
        asset.X = updatedAsset.X;
        asset.Y = updatedAsset.Y;
        asset.Active = updatedAsset.Active;

        _context.SaveChanges();
        return Ok(asset);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAsset(int id)
    {
        var asset = _context.Assets.Find(id);
        if (asset == null) return NotFound();

        _context.Assets.Remove(asset);
        _context.SaveChanges();
        return NoContent();
    }
}
