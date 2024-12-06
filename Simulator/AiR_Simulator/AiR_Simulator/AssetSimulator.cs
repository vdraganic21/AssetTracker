using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace AssetDataSimulator
{
    public class AssetSimulator
    {
        public List<IoTAsset> Assets { get; }
        private readonly string _instructionFile;
        private readonly List<List<string>> _assetInstructions;  // Each asset has its own list of instructions
        private readonly List<int> _currentInstructionIndices;    // Track the current instruction index for each asset

        public AssetSimulator(List<IoTAsset> assets, string instructionFile)
        {
            Assets = assets;
            _instructionFile = instructionFile;
            _assetInstructions = LoadInstructions();  // Load instructions for each asset
            _currentInstructionIndices = new List<int>(new int[assets.Count]);  // Initialize indices to 0 for each asset
        }

        private List<List<string>> LoadInstructions()
        {
            if (!File.Exists(_instructionFile))
            {
                Console.WriteLine($"Instruction file {_instructionFile} not found.");
                return new List<List<string>>();
            }

            var allInstructions = File.ReadAllLines(_instructionFile)
                .Where(line => !string.IsNullOrWhiteSpace(line) && !line.StartsWith("#"))
                .ToList();

            var assetInstructions = new List<List<string>>();

            // Distribute the instructions to each asset
            foreach (var asset in Assets)
            {
                var assetSpecificInstructions = new List<string>();
                // Add the relevant instructions (MOVES/TURNS) to each asset's instruction list
                foreach (var instruction in allInstructions)
                {
                    assetSpecificInstructions.Add(instruction);
                }
                assetInstructions.Add(assetSpecificInstructions);
            }

            return assetInstructions;
        }

        public List<string> SimulateNextStep()
        {
            var result = new List<string>();

            for (int i = 0; i < Assets.Count; i++)
            {
                var asset = Assets[i];
                var assetInstructionsList = _assetInstructions[i];

                if (assetInstructionsList.Count == 0)
                {
                    Console.WriteLine($"No instructions available for Asset {asset.AssetId}.");
                    continue;
                }

                // Process the current instruction for this asset
                string currentInstruction = null;
                bool validInstruction = false;

                // Find the next valid instruction
                while (!validInstruction && _currentInstructionIndices[i] < assetInstructionsList.Count)
                {
                    currentInstruction = assetInstructionsList[_currentInstructionIndices[i]];
                    _currentInstructionIndices[i] = (_currentInstructionIndices[i] + 1) % assetInstructionsList.Count;  // Loop back to the first instruction when done

                    // Example instruction format: MOVE 10 or TURN 90
                    var instructionParts = currentInstruction.Split(' ');

                    if (instructionParts.Length == 2)
                    {
                        if (instructionParts[0] == "MOVE" && double.TryParse(instructionParts[1], out double moveDistance))
                        {
                            asset.Move(moveDistance);
                            validInstruction = true;
                        }
                        else if (instructionParts[0] == "TURN" && double.TryParse(instructionParts[1], out double turnAngle))
                        {
                            asset.Turn(turnAngle);
                            validInstruction = true;
                        }
                    }
                }

                if (validInstruction)
                {
                    result.Add($"{{\"asset_id\":{asset.AssetId},\"x\":{(int)Math.Round(asset.X)},\"y\":{(int)Math.Round(asset.Y)},\"orientation\":{(int)Math.Round(asset.Orientation)},\"status\":\"active\",\"timestamp\":\"{DateTime.UtcNow:yyyy-MM-ddTHH:mm:ss.fffZ}\"}}");
                }
            }

            return result;
        }
    }
}
