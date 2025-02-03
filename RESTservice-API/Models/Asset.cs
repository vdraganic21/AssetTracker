using System.Text.Json.Serialization;

namespace RESTservice_API.Models
{
    public class Asset
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("floorMapId")]
        public int? FloorMapId { get; set; }

        [JsonPropertyName("x")]
        public double X { get; set; }

        [JsonPropertyName("y")]
        public double Y { get; set; }

        [JsonPropertyName("active")]
        public bool Active { get; set; }
    }
}
