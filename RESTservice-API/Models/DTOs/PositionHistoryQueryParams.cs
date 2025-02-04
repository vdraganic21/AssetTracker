using System;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models.DTOs
{
    public class PositionHistoryQueryParams
    {
        [JsonPropertyName("floorMapId")]
        public int? FloorMapId { get; set; }

        [JsonPropertyName("assetId")]
        public int? AssetId { get; set; }

        [JsonPropertyName("startDate")]
        public DateTime? StartDate { get; set; }

        [JsonPropertyName("endDate")]
        public DateTime? EndDate { get; set; }
    }
}
