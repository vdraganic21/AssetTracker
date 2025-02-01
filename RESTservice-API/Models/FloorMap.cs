using System.Collections.Generic;

namespace RESTservice_API.Models
{
    public class FloorMap
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageBase64 { get; set; }

        // Navigation properties
        public virtual ICollection<Asset> Assets { get; set; }
        public virtual ICollection<Zone> Zones { get; set; }
    }
}