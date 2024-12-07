using System;
using System.Collections.Generic;

namespace AiR_Simulator.Entities
{
    public class Asset
    {
        public int AssetId { get; }
        public double X { get; private set; }
        public double Y { get; private set; }
        public List<(double X, double Y)> Positions { get; }
        private int _currentPositionIndex;

        public Asset(int assetId, List<(double X, double Y)> positions)
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

            var (goalX, goalY) = Positions[_currentPositionIndex];

            double dx = goalX - X;
            double dy = goalY - Y;
            double distance = Math.Sqrt(dx * dx + dy * dy);

            const double arrivalThreshold = 0.1;

            if (distance <= arrivalThreshold)
            {
                X = goalX;
                Y = goalY;
                Console.WriteLine($"Asset {AssetId} reached position ({goalX}, {goalY}).");

                _currentPositionIndex = (_currentPositionIndex + 1) % Positions.Count;
                return;
            }

            double moveDistance = Math.Min(speed, distance);
            double stepX = dx / distance * moveDistance;
            double stepY = dy / distance * moveDistance;

            X += stepX;
            Y += stepY;
        }
    }
}
