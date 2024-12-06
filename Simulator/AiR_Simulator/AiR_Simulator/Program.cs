using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.Configuration;
using System.IO;
using MQTTnet.Server;
using System.Collections.Generic;
using System.Linq;

namespace AssetDataSimulator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            LoadEnv();

            string brokerUrl = Environment.GetEnvironmentVariable("MQTT_BROKER_URL") ?? "localhost";
            int brokerPort = int.Parse(Environment.GetEnvironmentVariable("MQTT_BROKER_PORT") ?? "1883");
            string topic = Environment.GetEnvironmentVariable("ASSET_TOPIC") ?? "assets/location";
            int messageInterval = int.Parse(Environment.GetEnvironmentVariable("MESSAGE_INTERVAL") ?? "1000");
            string instructionFile = "../../AssetInstructions.txt";

            Console.WriteLine($"Broker URL: {brokerUrl}");
            Console.WriteLine($"Broker Port: {brokerPort}");
            Console.WriteLine($"Topic: {topic}");
            Console.WriteLine($"Message Interval: {messageInterval} ms");
            Console.WriteLine("##########################################");

            var mqttFactory = new MqttFactory();
            var mqttClient = mqttFactory.CreateMqttClient();

            var mqttOptions = new MqttClientOptionsBuilder()
                .WithTcpServer(brokerUrl, brokerPort)
                .WithCleanSession()
                .Build();

            mqttClient.ConnectedAsync += async e =>
            {
                Console.WriteLine($"Connected to MQTT broker at {brokerUrl}:{brokerPort}");
                await Task.CompletedTask;
            };

            mqttClient.DisconnectedAsync += async e =>
            {
                Console.WriteLine($"Disconnected from MQTT broker: {e.Exception?.Message}");
                await Task.CompletedTask;
            };

            bool isConnected = false;
            try
            {
                await mqttClient.ConnectAsync(mqttOptions, CancellationToken.None);
                isConnected = true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect: {ex.Message}");
            }

            // Initialize Assets from instruction file
            List<IoTAsset> assets = LoadAssetsFromInstructionFile(instructionFile);

            if (assets == null || assets.Count == 0)
            {
                Console.WriteLine("No assets were initialized from the instruction file.");
                return;
            }

            // Initialize AssetSimulator with the assets and the instruction file
            var simulator = new AssetSimulator(assets, instructionFile);

            while (true)
            {
                try
                {
                    var simulatedDataList = simulator.SimulateNextStep();

                    // Printing assets in a table-like format horizontally
                    PrintAssetsHeader();

                    int assetCount = simulatedDataList.Count;
                    for (int i = 0; i < assetCount; i++)
                    {
                        var assetData = simulatedDataList[i];
                        var asset = simulator.Assets[i];

                        // Print each asset's details in a row
                        PrintAssetData(asset);
                    }

                    if (isConnected)
                    {
                        foreach (var simulatedData in simulatedDataList)
                        {
                            var messagePayload = new MqttApplicationMessageBuilder()
                                .WithTopic(topic)
                                .WithPayload(simulatedData)
                                .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
                                .WithRetainFlag(false)
                                .Build();

                            try
                            {
                                await mqttClient.PublishAsync(messagePayload, CancellationToken.None);
                                Console.ForegroundColor = ConsoleColor.Yellow;
                                Console.WriteLine($"Published to {topic}: {simulatedData}");
                            }
                            catch (Exception pubEx)
                            {
                                Console.ForegroundColor = ConsoleColor.Red;
                                Console.WriteLine($"Failed to publish message: {pubEx.Message}");
                            }
                        }
                    }

                    await Task.Delay(messageInterval);
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Simulation error: {ex.Message}");
                }
            }
        }

        static void LoadEnv()
        {
            string fileName = "config.env";
            string path = Path.Combine(Directory.GetCurrentDirectory(), "config.env");

            Console.WriteLine("Loading env file from " + path);

            if (!File.Exists(path))
            {
                Console.WriteLine($"Environment file not found. Creating with default values.");

                var defaultEnvContent = new[] {
                    "MQTT_BROKER_URL=localhost",
                    "MQTT_BROKER_PORT=1883",
                    "ASSET_TOPIC=assets/location",
                    "MESSAGE_INTERVAL=2000"
                };

                File.WriteAllLines(fileName, defaultEnvContent);
            }

            foreach (var line in File.ReadAllLines(fileName))
            {
                if (string.IsNullOrWhiteSpace(line) || line.StartsWith("#")) continue;

                var parts = line.Split('=');
                if (parts.Length == 2)
                {
                    Environment.SetEnvironmentVariable(parts[0], parts[1]);
                }
            }
        }

        static List<IoTAsset> LoadAssetsFromInstructionFile(string instructionFile)
        {
            List<IoTAsset> assets = new List<IoTAsset>();

            if (!File.Exists(instructionFile))
            {
                Console.WriteLine($"Instruction file '{instructionFile}' not found.");
                return null;
            }

            var lines = File.ReadAllLines(instructionFile)
                .Where(line => !string.IsNullOrWhiteSpace(line) && !line.StartsWith("#"))
                .ToList();

            if (lines.Count == 0)
            {
                Console.WriteLine("Instruction file is empty or contains only comments.");
                return null;
            }

            foreach (var line in lines)
            {
                // This expects the format: ASSET_ID X Y ORIENTATION
                var parts = line.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);

                if (parts.Length == 4 && int.TryParse(parts[0], out int assetId) &&
                    double.TryParse(parts[1], out double x) &&
                    double.TryParse(parts[2], out double y) &&
                    double.TryParse(parts[3], out double orientation))
                {
                    assets.Add(new IoTAsset(assetId, x, y, orientation));
                }
            }

            return assets;
        }


        static void PrintAssetsHeader()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("| {0,-10} | {1,-20} | {2,-11} |", "Asset ID", "Position (X, Y)", "Orientation");
            Console.WriteLine(new string('-', 50));  // Adds a separator line
        }

        static void PrintAssetData(IoTAsset asset)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("| {0,-10} | {1,-20} | {2,-11} |",
                asset.AssetId,
                $"({asset.X:F2}, {asset.Y:F2})",
                $"{asset.Orientation:F2}°");
        }
    }
}
