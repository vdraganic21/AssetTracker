using System;

namespace AssetDataSimulator
{
    public class IoTAsset
    {
        public int AssetId { get; private set; }

        public double X { get; set; } 
        public double Y { get; set; }
        public double Orientation { get; set; }

        public IoTAsset(int assetId, double startX = 0, double startY = 0, double startOrientation = 0)
        {
            AssetId = assetId;
            X = startX;
            Y = startY;
            Orientation = startOrientation;
        }

        public void Move(double distance)
        {
            // Convert orientation to radians
            double radians = Orientation * Math.PI / 180;

            // Calculate the new X and Y movements
            double  deltaY = distance * Math.Cos(radians);
            double deltaX = distance * Math.Sin(radians);

            X += deltaX;
            Y += deltaY;
        }

        public void Turn(double degrees)
        {
            Orientation = (Orientation + degrees) % 360;
            if (Orientation < 0) Orientation += 360; // Normalize to 0-360
            Orientation = Math.Round(Orientation, 2);
        }

        // ToString method to display the asset's state
        public override string ToString()
        {
            return $"AssetId: {AssetId}, Position: ({X:F2}, {Y:F2}), Orientation: {Orientation:F2}°";
        }
    }
}
