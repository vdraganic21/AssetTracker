using System;
using System.Collections.Generic;
using AiR_Simulator.Utilities;

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
            Logger.Log($"Creating asset {assetId} with {positions?.Count} positions");
            AssetId = assetId;
            Positions = positions ?? new List<(double X, double Y)>();
            _currentPositionIndex = 0;

            if (Positions.Count > 0)
            {
                X = Positions[0].X;
                Y = Positions[0].Y;
                TargetX = X;
                TargetY = Y;
            }
            else
            {
                X = 0;
                Y = 0;
                TargetX = X;
                TargetY = Y;
            }

            Position = new Position
            {
                X = X,
                Y = Y,
                FloorplanName = "Floor 1"
            };

            TargetPosition = new Position
            {
                X = TargetX,
                Y = TargetY,
                FloorplanName = "Floor 1"
            };
        }

        public void SetManualTarget(double targetX, double targetY)
        {
            Logger.Log($"Setting manual target for asset {AssetId}: ({targetX}, {targetY})");
            IsManualControl = true;
            _manualTargetX = targetX;
            _manualTargetY = targetY;

            TargetX = targetX;
            TargetY = targetY;

            Logger.Log($"Asset {AssetId} state after setting target:");
            Logger.Log($"  IsManualControl: {IsManualControl}");
            Logger.Log($"  Current: ({X}, {Y})");
            Logger.Log($"  Target: ({_manualTargetX}, {_manualTargetY})");
            Logger.Log($"  Has positions: {Positions?.Count}");

            if (TargetPosition == null)
            {
                TargetPosition = new Position
                {
                    X = targetX,
                    Y = targetY,
                    FloorplanName = Position?.FloorplanName ?? "Floor 1"
                };
            }
            else
            {
                TargetPosition.X = targetX;
                TargetPosition.Y = targetY;
            }
        }

        public bool HasTarget()
        {
            return !double.IsNaN(TargetX) && !double.IsNaN(TargetY);
        }

        public void MoveTowardNextPosition(double speed)
        {
            Logger.Log($"Moving asset {AssetId} - IsManualControl: {IsManualControl}, Current: ({X}, {Y}), Target: ({_manualTargetX}, {_manualTargetY})");

            if (IsManualControl)
            {
                double dx = _manualTargetX - X;
                double dy = _manualTargetY - Y;
                double distance = Math.Sqrt(dx * dx + dy * dy);

                Logger.Log($"Manual movement - Distance to target: {distance}");

                const double arrivalThreshold = 0.1;

                if (distance <= arrivalThreshold)
                {
                    Logger.Log($"Asset {AssetId} reached manual target");
                    X = _manualTargetX;
                    Y = _manualTargetY;
                    IsManualControl = false;
                    if (Positions.Count >= 2) UpdateAutomaticTarget();
                    return;
                }

                double moveDistance = Math.Min(speed, distance);
                double stepX = dx / distance * moveDistance;
                double stepY = dy / distance * moveDistance;

                X += stepX;
                Y += stepY;

                Logger.Log($"Asset {AssetId} moved to ({X}, {Y})");
            }
            else if (Positions.Count > 1)
            {
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
                    UpdateAutomaticTarget();
                    return;
                }

                double moveDistance = Math.Min(speed, distance);
                double stepX = dx / distance * moveDistance;
                double stepY = dy / distance * moveDistance;

                X += stepX;
                Y += stepY;

                TargetPosition.X = goalX;
                TargetPosition.Y = goalY;
            }

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
            Logger.Log($"Setting path for asset {AssetId} - Current positions: {Positions?.Count}, New positions: {positions?.Count}");
            this.Positions = positions;
            if (positions.Count > 1)
            {
                UpdateAutomaticTarget();
            }
        }
    }
}
