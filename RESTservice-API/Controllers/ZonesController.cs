using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;

namespace RESTservice_API.Controllers
{
    [Route("zones")]
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
        public async Task<IActionResult> UpdateZone(int id, Zone updatedZone)
        {
            var zone = await _zoneRepository.GetZoneByIdAsync((int)id);
            if (zone == null) return NotFound($"Zone with ID {id} not found.");

            if (updatedZone.Id != default)
            {
                zone.Id = updatedZone.Id;
            }

            if (!string.IsNullOrEmpty(updatedZone.Name))
            {
                zone.Name = updatedZone.Name;
            }

            if (!string.IsNullOrEmpty(updatedZone.Points))
            {
                zone.Points = updatedZone.Points;
            }

            if (updatedZone.FloorMapId != default)
            {
                zone.FloorMapId = updatedZone.FloorMapId;
            }

            var updatedZoneResult = await _zoneRepository.UpdateZoneAsync(id, zone);
            if (updatedZoneResult == null)
                return NotFound();

            return Ok(updatedZoneResult);
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
