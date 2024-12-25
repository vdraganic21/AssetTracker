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

        public bool IsManualControl { get; private set; } = false; // Manual control flag
        private double _manualTargetX, _manualTargetY;

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

        public void SetManualTarget(double targetX, double targetY)
        {
            IsManualControl = true;
            _manualTargetX = targetX;
            _manualTargetY = targetY;
        }

        public void MoveTowardNextPosition(double speed)
        {
            if (IsManualControl)
            {
                // Move toward the manual target
                double dx = _manualTargetX - X;
                double dy = _manualTargetY - Y;
                double distance = Math.Sqrt(dx * dx + dy * dy);

                const double arrivalThreshold = 0.1;

                if (distance <= arrivalThreshold)
                {
                    X = _manualTargetX;
                    Y = _manualTargetY;
                    IsManualControl = false; // Disable manual control when the target is reached
                    return;
                }

                double moveDistance = Math.Min(speed, distance);
                double stepX = dx / distance * moveDistance;
                double stepY = dy / distance * moveDistance;

                X += stepX;
                Y += stepY;
            }
            else
            {
                // Automatic movement
                if (Positions.Count == 0) return;

                var (goalX, goalY) = Positions[_currentPositionIndex];
                double dx = goalX - X;
                double dy = goalY - Y;
                double distance = Math.Sqrt(dx * dx + dy * dy);

                const double arrivalThreshold = 0.1;

                if (distance <= arrivalThreshold)
                {
                    X = goalX;
                    Y = goalY;
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

}
