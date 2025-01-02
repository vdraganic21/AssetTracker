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

        public Position Position { get; set; }
        public Position TargetPosition { get; set; }

        public Asset(int assetId, List<(double X, double Y)> positions)
        {
            AssetId = assetId;
            Positions = positions;
            _currentPositionIndex = 0;

            // Only set up automatic targeting if we have multiple positions
            if (Positions.Count > 1)
            {
                UpdateAutomaticTarget();
            }
            else
            {
                // If we only have one position, use it as both current and target
                X = Positions[0].X;
                Y = Positions[0].Y;
                TargetX = X;
                TargetY = Y;
            }

            // Initialize Position object
            Position = new Position
            {
                X = X,
                Y = Y,
                FloorplanName = "Floor 1"  // Default floorplan name
            };

            // Initialize TargetPosition object
            TargetPosition = new Position
            {
                X = TargetX,
                Y = TargetY,
                FloorplanName = "Floor 1"  // Default floorplan name
            };
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

            // Update Position and TargetPosition after movement
            Position.X = X;
            Position.Y = Y;
            
            if (TargetPosition == null)
            {
                TargetPosition = new Position 
                { 
                    X = TargetX,
                    Y = TargetY,
                    FloorplanName = Position.FloorplanName 
                };
            }
            else
            {
                TargetPosition.X = TargetX;
                TargetPosition.Y = TargetY;
            }
        }

        private void UpdateAutomaticTarget()
        {
            if (Positions.Count > 0)
            {
                var (nextTargetX, nextTargetY) = Positions[_currentPositionIndex];
                TargetX = nextTargetX;
                TargetY = nextTargetY;

                // Update TargetPosition to match
                if (TargetPosition == null)
                {
                    TargetPosition = new Position 
                    { 
                        X = nextTargetX,
                        Y = nextTargetY,
                        FloorplanName = Position?.FloorplanName ?? "Floor 1"
                    };
                }
                else
                {
                    TargetPosition.X = nextTargetX;
                    TargetPosition.Y = nextTargetY;
                }
            }
            else
            {
                TargetX = double.NaN;
                TargetY = double.NaN;
            }
        }

        public void SetPath(List<(double X, double Y)> positions)
        {
            Console.WriteLine($"Setting path for asset {AssetId} - Current positions: {Positions?.Count}, New positions: {positions?.Count}");
            this.Positions = positions;
            if (positions.Count > 1)
            {
                UpdateAutomaticTarget();
            }
        }
    }
}
