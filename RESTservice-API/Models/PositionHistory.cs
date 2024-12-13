namespace RESTservice_API.Models
{
    public class PositionHistory
    {
        public int Id { get; set; }
        public int AssetId { get; set; }
        public int FloorMapId { get; set; }
        public DateTime Timestamp { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
    }
}