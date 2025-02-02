using System.Text.Json.Serialization;

namespace RESTservice_API.Models.DTOs
{
    public class AssetZoneHistoryDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("assetId")]
        public int AssetId { get; set; }

        [JsonPropertyName("zoneId")]
        public int ZoneId { get; set; }

        [JsonPropertyName("enterDateTime")]
        public DateTime EnterDateTime { get; set; }

        [JsonPropertyName("exitDateTime")]
        public DateTime? ExitDateTime { get; set; }

        [JsonPropertyName("retentionTime")]
        public int? RetentionTime { get; set; }

        [JsonPropertyName("assetName")]
        public string AssetName { get; set; }

        [JsonPropertyName("zoneName")]
        public string ZoneName { get; set; }
    }
}
