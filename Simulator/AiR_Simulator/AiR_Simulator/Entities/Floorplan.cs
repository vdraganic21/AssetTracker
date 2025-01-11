using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AiR_Simulator.Entities
{
    public class Floorplan
    {
        public int FloorplanId { get; set; }
        public string Name { get; set; }
        public List<Asset> Assets { get; set; }

        public Floorplan(string name) 
        { 
            Name = name;
        }
    }
}
