using System;
using System.Collections.Generic;

namespace AssetDataSimulator
{
    public class IoTAsset
    {
        public int AssetId { get; }
        public double X { get; private set; }
        public double Y { get; private set; }
        public List<(double X, double Y)> Positions { get; }
        private int _currentPositionIndex;

        public IoTAsset(int assetId, List<(double X, double Y)> positions)
        {
            AssetId = assetId;
            Positions = positions;
            if (Positions.Count > 0)
            {
                X = Positions[0].X;
                Y = Positions[0].Y;
            }
            _currentPositionIndex = 0;
        }

        public void MoveTowardNextPosition(double speed)
        {
            if (Positions.Count == 0)
            {
                Console.WriteLine($"Asset {AssetId} has no positions to move to.");
                return;
            }

            // Get the next position in the sequence
            var (goalX, goalY) = Positions[_currentPositionIndex];

            // Calculate distance and direction
            double dx = goalX - X;
            double dy = goalY - Y;
            double distance = Math.Sqrt(dx * dx + dy * dy);

            // Define a threshold for "arriving" at the target
            const double arrivalThreshold = 0.1;

            // If close enough to the goal, snap to it and move to the next position
            if (distance <= arrivalThreshold)
            {
                X = goalX;
                Y = goalY;
                Console.WriteLine($"Asset {AssetId} reached position ({goalX}, {goalY}).");

                _currentPositionIndex = (_currentPositionIndex + 1) % Positions.Count;
                return;
            }

            // Calculate the maximum distance we can move in this step
            double moveDistance = Math.Min(speed, distance); // Don't overshoot the target
            double stepX = (dx / distance) * moveDistance;
            double stepY = (dy / distance) * moveDistance;

            X += stepX;
            Y += stepY;
        }
    }
}
