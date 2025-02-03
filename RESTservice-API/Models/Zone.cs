using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models
{
    public class Zone
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("floorMapId")]
        public int FloorMapId { get; set; }

        [Column(TypeName = "json")]
        [JsonPropertyName("points")]
        public string Points { get; set; } // Serialized array of points
    }
}