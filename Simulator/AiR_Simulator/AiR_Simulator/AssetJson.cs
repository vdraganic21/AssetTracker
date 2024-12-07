using System.Collections.Generic;

namespace AssetDataSimulator
{
    public class AssetJson
    {
        public int AssetId { get; set; }
        public List<Position> Positions { get; set; }
    }

    public class Position
    {
        public double X { get; set; }
        public double Y { get; set; }
    }
}
