using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiTests.Models
{
    public class FloorMap
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string ImageBase64 { get; set; }
    }
}
