using System.ComponentModel.DataAnnotations.Schema;

namespace RESTservice_API.Models
{
    public class Zone
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FloorMapId { get; set; }

        [Column(TypeName = "json")]
        public string Points { get; set; } // Serialized array of points
    }
}