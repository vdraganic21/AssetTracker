using System.Text.Json.Serialization;

namespace RESTservice_API.Models.DTOs
{
    public class AssetZoneHistoryQueryParams
    {
        [JsonPropertyName("assetId")]
        public int? AssetId { get; set; }

        [JsonPropertyName("zoneId")]
        public int? ZoneId { get; set; }

        [JsonPropertyName("entryStartTime")]
        public DateTime? EntryStartTime { get; set; }

        [JsonPropertyName("entryEndTime")]
        public DateTime? EntryEndTime { get; set; }

        [JsonPropertyName("exitStartTime")]
        public DateTime? ExitStartTime { get; set; }

        [JsonPropertyName("exitEndTime")]
        public DateTime? ExitEndTime { get; set; }

        [JsonPropertyName("minRetentionTime")]
        public int? MinRetentionTime { get; set; }

        [JsonPropertyName("maxRetentionTime")]
        public int? MaxRetentionTime { get; set; }
    }
}
