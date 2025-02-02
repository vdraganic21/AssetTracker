using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RESTservice_API.Models
{
    public class AssetZoneHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [Required]
        [JsonPropertyName("assetId")]
        public int AssetId { get; set; }

        [Required]
        [JsonPropertyName("zoneId")]
        public int ZoneId { get; set; }

        [JsonPropertyName("enterDateTime")]
        public DateTime EnterDateTime { get; set; }

        [JsonPropertyName("exitDateTime")]
        public DateTime? ExitDateTime { get; set; }

        [JsonPropertyName("retentionTime")]
        public int? RetentionTime { get; set; }

        [ForeignKey("AssetId")]
        public Asset Asset { get; set; }

        [ForeignKey("ZoneId")]
        public Zone Zone { get; set; }
    }
}
