namespace RESTservice_API.Models
{
    public class Zone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FloorMapId { get; set; }
        public string Points { get; set; } // Serialized array of points
    }

}