using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;

namespace RESTservice_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZonesController : ControllerBase
    {
        private readonly IZoneRepository _zoneRepository;

        public ZonesController(IZoneRepository zoneRepository)
        {
            _zoneRepository = zoneRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Zone>>> GetZones()
        {
            var zones = await _zoneRepository.GetAllZonesAsync();
            return Ok(zones);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Zone>> GetZone(int id)
        {
            var zone = await _zoneRepository.GetZoneByIdAsync(id);
            if (zone == null)
                return NotFound();

            return Ok(zone);
        }

        [HttpGet("floormap/{floorMapId}")]
        public async Task<ActionResult<IEnumerable<Zone>>> GetZonesByFloorMap(int floorMapId)
        {
            var zones = await _zoneRepository.GetZonesByFloorMapIdAsync(floorMapId);
            return Ok(zones);
        }

        [HttpPost]
        public async Task<ActionResult<Zone>> CreateZone(Zone zone)
        {
            var createdZone = await _zoneRepository.CreateZoneAsync(zone);
            return CreatedAtAction(nameof(GetZone), new { id = createdZone.Id }, createdZone);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateZone(int id, Zone zone)
        {
            var updatedZone = await _zoneRepository.UpdateZoneAsync(id, zone);
            if (updatedZone == null)
                return NotFound();

            return Ok(updatedZone);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZone(int id)
        {
            var result = await _zoneRepository.DeleteZoneAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
