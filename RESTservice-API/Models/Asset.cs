namespace RESTservice_API.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? FloorMapId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public bool Active { get; set; }
    }
}
