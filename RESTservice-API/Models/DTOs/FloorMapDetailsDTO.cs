using RESTservice_API.Models;

namespace RESTservice_API.Models.DTOs
{
    public class FloorMapDetailsDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageBase64 { get; set; }
        public IEnumerable<Asset> Assets { get; set; }
        public IEnumerable<Zone> Zones { get; set; }
    }
}
