using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RESTservice_API.Models
{
    public class AssetZoneHistory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int AssetId { get; set; }

        [Required]
        public int ZoneId { get; set; }

        [Required]
        public DateTime EnterDateTime { get; set; }

        public DateTime? ExitDateTime { get; set; }

        public int? RetentionTime { get; set; }

        [ForeignKey("AssetId")]
        public Asset Asset { get; set; }

        [ForeignKey("ZoneId")]
        public Zone Zone { get; set; }
    }
}
