using System;
using System.Collections.Generic;

namespace AiR_Simulator.Entities
{
    public class Asset
    {
        public int AssetId { get; set; }
        public double X { get; private set; }
        public double Y { get; private set; }
        public List<(double X, double Y)> Positions { get; set; }
        private int _currentPositionIndex;
        public double TargetX { get; private set; }
        public double TargetY { get; private set; }
        public int FloorplanId { get; set; }

        public bool IsManualControl { get; private set; } = false;
        private double _manualTargetX, _manualTargetY;

        public Asset(int assetId, List<(double X, double Y)> positions)
        {
            AssetId = assetId;
            Positions = positions;
            if (Positions.Count > 0)
            {
                X = Positions[0].X;
                Y = Positions[0].Y;

                TargetX = Positions[0].X;
                TargetY = Positions[0].Y;
            }
            _currentPositionIndex = 0;
        }

        public void SetManualTarget(double targetX, double targetY)
        {
            IsManualControl = true;
            _manualTargetX = targetX;
            _manualTargetY = targetY;

            TargetX = targetX;
            TargetY = targetY;
        }

        public bool HasTarget()
        {
            return !double.IsNaN(TargetX) && !double.IsNaN(TargetY);
        }

        public void MoveTowardNextPosition(double speed)
        {
            if (IsManualControl)
            {
                double dx = _manualTargetX - X;
                double dy = _manualTargetY - Y;
                double distance = Math.Sqrt(dx * dx + dy * dy);

                const double arrivalThreshold = 0.1;

                if (distance <= arrivalThreshold)
                {
                    X = _manualTargetX;
                    Y = _manualTargetY;

                    IsManualControl = false;

                    UpdateAutomaticTarget();
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

                    // Update to the next target position
                    _currentPositionIndex = (_currentPositionIndex + 1) % Positions.Count;
                    UpdateAutomaticTarget();
                    return;
                }

                double moveDistance = Math.Min(speed, distance);
                double stepX = dx / distance * moveDistance;
                double stepY = dy / distance * moveDistance;

                X += stepX;
                Y += stepY;
            }
        }

        private void UpdateAutomaticTarget()
        {
            if (Positions.Count > 0)
            {
                var (nextTargetX, nextTargetY) = Positions[_currentPositionIndex];
                TargetX = nextTargetX;
                TargetY = nextTargetY;
            }
            else
            {
                TargetX = double.NaN;
                TargetY = double.NaN;
            }
        }
    }
}
