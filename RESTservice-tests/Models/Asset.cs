using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiTests.Models
{
    public class Asset
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public int FloorMapId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public bool Active { get; set; }
    }
}
