using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiTests.Models
{
    internal class AssetPositionHistory
    {
        public int Id { get; set; }
        public int AssetId { get; set; }
        public int FloorMapId { get; set; }
        public DateTime Timestamp { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
    }
}
