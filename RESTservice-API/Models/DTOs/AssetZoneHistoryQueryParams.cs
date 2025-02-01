namespace RESTservice_API.Models.DTOs
{
    public class AssetZoneHistoryQueryParams
    {
        public int? AssetId { get; set; }
        public int? ZoneId { get; set; }
        public DateTime? EntryStartTime { get; set; }
        public DateTime? EntryEndTime { get; set; }
        public DateTime? ExitStartTime { get; set; }
        public DateTime? ExitEndTime { get; set; }
        public int? MinRetentionTime { get; set; }
        public int? MaxRetentionTime { get; set; }
    }
}
