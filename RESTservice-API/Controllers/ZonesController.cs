using Microsoft.AspNetCore.Mvc;
using RESTservice_API.Interfaces;
using RESTservice_API.Models;
using RESTservice_API.Models.DTOs;
using System.Text.Json;

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
        public async Task<ActionResult<IEnumerable<ZoneDTO>>> GetZones()
        {
            var zones = await _zoneRepository.GetAllZonesAsync();
            return Ok(zones.Select(ZoneDTO.FromZone));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ZoneDTO>> GetZone(int id)
        {
            var zone = await _zoneRepository.GetZoneByIdAsync(id);
            if (zone == null)
                return NotFound();

            return Ok(ZoneDTO.FromZone(zone));
        }

        [HttpGet("floormap/{floorMapId}")]
        public async Task<ActionResult<IEnumerable<ZoneDTO>>> GetZonesByFloorMap(int floorMapId)
        {
            var zones = await _zoneRepository.GetZonesByFloorMapIdAsync(floorMapId);
            return Ok(zones.Select(ZoneDTO.FromZone));
        }

        [HttpPost]
        public async Task<ActionResult<ZoneDTO>> CreateZone(ZoneDTO zoneDto)
        {
            if (!zoneDto.Validate())
            {
                return BadRequest("Zone must have at least 2 points to define its boundaries.");
            }

            var zone = zoneDto.ToZone();
            var createdZone = await _zoneRepository.CreateZoneAsync(zone);
            return CreatedAtAction(nameof(GetZone), new { id = createdZone.Id }, ZoneDTO.FromZone(createdZone));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateZone(int id, ZoneDTO updatedZoneDto)
        {
            var zone = await _zoneRepository.GetZoneByIdAsync(id);
            if (zone == null) 
                return NotFound($"Zone with ID {id} not found.");

            if (updatedZoneDto.Points != null)
            {
                if (!updatedZoneDto.Validate())
                {
                    return BadRequest("Zone must have at least 2 points to define its boundaries.");
                }
                var pointsToUse = updatedZoneDto.Points.Length == 2 ? 
                    JsonSerializer.Serialize(updatedZoneDto.ToZone().Points) : 
                    JsonSerializer.Serialize(updatedZoneDto.Points);
                zone.Points = pointsToUse;
            }

            if (!string.IsNullOrEmpty(updatedZoneDto.Name))
            {
                zone.Name = updatedZoneDto.Name;
            }

            if (updatedZoneDto.FloorMapId != default)
            {
                zone.FloorMapId = updatedZoneDto.FloorMapId;
            }

            var updatedZone = await _zoneRepository.UpdateZoneAsync(id, zone);
            if (updatedZone == null)
                return NotFound();

            return Ok(ZoneDTO.FromZone(updatedZone));
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
