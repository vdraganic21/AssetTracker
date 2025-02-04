using System.Text.Json.Serialization;

namespace RESTservice_API.Models 
{
    public class Point
    {
        [JsonPropertyName("x")]
        public int x { get; set; }
        
        [JsonPropertyName("y")]
        public int y { get; set; }
    }
}
