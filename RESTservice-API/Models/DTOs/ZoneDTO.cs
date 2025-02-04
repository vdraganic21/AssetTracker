using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models.DTOs
{
    public class ZoneDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }
        
        [Required]
        [JsonPropertyName("name")]
        public string Name { get; set; }
        
        [Required]
        [JsonPropertyName("floorMapId")]
        public int FloorMapId { get; set; }
        
        [Required]
        [JsonPropertyName("points")]
        public Point[] Points { get; set; }

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

        public bool Validate()
        {
            if (Points == null || Points.Length < 2)
            {
                return false;
            }
            return true;
        }

        public Zone ToZone()
        {
            var pointsToUse = Points.Length == 2 ? ConvertToSquare(Points) : Points;
            
            return new Zone
            {
                Id = Id,
                Name = Name,
                FloorMapId = FloorMapId,
                Points = JsonSerializer.Serialize(pointsToUse)
            };
        }

        public static ZoneDTO FromZone(Zone zone)
        {
            var points = JsonSerializer.Deserialize<Point[]>(zone.Points);
            var convertedPoints = points.Length == 2 ? ConvertToSquare(points) : points;

            return new ZoneDTO
            {
                Id = zone.Id,
                Name = zone.Name,
                FloorMapId = zone.FloorMapId,
                Points = convertedPoints
            };
        }
    }
}
