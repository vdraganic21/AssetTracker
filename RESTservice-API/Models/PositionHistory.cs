using System.Text.Json.Serialization;

namespace RESTservice_API.Models
{
    public class PositionHistory
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("assetId")]
        public int AssetId { get; set; }
        [JsonPropertyName("floorMapId")]
        public int FloorMapId { get; set; }
        [JsonPropertyName("timestamp")]
        public DateTime Timestamp { get; set; }
        [JsonPropertyName("x")]
        public double X { get; set; }
        [JsonPropertyName("y")]
        public double Y { get; set; }
    }
}