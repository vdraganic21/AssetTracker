namespace RESTservice_API.Models.DTOs
{
    public class AssetZoneHistoryQueryParams
    {
        public int? AssetId { get; set; }
        public int? ZoneId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public int? MinRetentionTime { get; set; }
        public int? MaxRetentionTime { get; set; }
    }
}
