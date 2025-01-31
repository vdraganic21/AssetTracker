namespace RESTservice_API.Models.DTOs
{
    public class AssetZoneHistoryDTO
    {
        public int Id { get; set; }
        public int AssetId { get; set; }
        public int ZoneId { get; set; }
        public DateTime EnterDateTime { get; set; }
        public DateTime? ExitDateTime { get; set; }
        public int? RetentionTime { get; set; }
        public string AssetName { get; set; }
        public string ZoneName { get; set; }
    }
}
