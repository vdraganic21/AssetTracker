using RESTservice_API.Models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models.DTOs
{
    public class FloorMapDetailsDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("imageBase64")]
        public string ImageBase64 { get; set; }

        [JsonPropertyName("assets")]
        public IEnumerable<Asset> Assets { get; set; }

        [JsonPropertyName("zones")]
        public IEnumerable<Zone> Zones { get; set; }

        private static Point[] ConvertToSquare(Point[] points)
        {
            if (points == null || points.Length != 2)
                return points;

            var p1 = points[0];
            var p2 = points[1];

            var topLeft = new Point 
            { 
                x = Math.Min(p1.x, p2.x),
                y = Math.Min(p1.y, p2.y)
            };
            
            var bottomRight = new Point 
            { 
                x = Math.Max(p1.x, p2.x),
                y = Math.Max(p1.y, p2.y)
            };

            return new Point[]
            {
                topLeft,
                new Point { x = bottomRight.x, y = topLeft.y },
                bottomRight,
                new Point { x = topLeft.x, y = bottomRight.y }
            };
        }

        public FloorMapDetailsDTO ConvertZonesToSquares()
        {
            if (Zones == null)
                return this;

            var convertedZones = Zones.Select(zone => 
            {
                var points = JsonSerializer.Deserialize<Point[]>(zone.Points);
                var convertedPoints = points.Length == 2 ? ConvertToSquare(points) : points;
                zone.Points = JsonSerializer.Serialize(convertedPoints);
                return zone;
            }).ToList();

            Zones = convertedZones;
            return this;
        }
    }
}
