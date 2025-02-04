using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models
{
    public class FloorMap
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("imageBase64")]
        public string ImageBase64 { get; set; }

        [JsonPropertyName("assets")]
        public virtual ICollection<Asset> Assets { get; set; }

        [JsonPropertyName("zones")]
        public virtual ICollection<Zone> Zones { get; set; }
    }
}