using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Collections.Generic;

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
            string jsonFilePath = "../../assets.json";
            double movementSpeed = 1.0; // Units per second

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

            var assets = LoadAssetsFromJson(jsonFilePath);

            if (assets == null || assets.Count == 0)
            {
                Console.WriteLine("No assets were initialized from the JSON file.");
                return;
            }

            var simulator = new AssetSimulator(jsonFilePath);

            while (true)
            {
                try
                {
                    var simulatedDataList = simulator.SimulateNextStep(movementSpeed);

                    // Print asset state in a table-like format
                    PrintAssetsHeader();

                    foreach (var asset in simulator.Assets)
                    {
                        PrintAssetData(asset);
                    }

                    // Publish updates to the MQTT broker
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

        static List<IoTAsset> LoadAssetsFromJson(string jsonFilePath)
        {
            if (!File.Exists(jsonFilePath))
            {
                Console.WriteLine($"JSON file '{jsonFilePath}' not found.");
                return null;
            }

            try
            {
                var jsonData = File.ReadAllText(jsonFilePath);
                var assetDataList = JsonSerializer.Deserialize<List<AssetJson>>(jsonData);

                if (assetDataList == null || assetDataList.Count == 0)
                {
                    Console.WriteLine("JSON file is empty or contains invalid data.");
                    return null;
                }

                var assets = new List<IoTAsset>();
                foreach (var assetData in assetDataList)
                {
                    var positions = new List<(double X, double Y)>();
                    foreach (var position in assetData.Positions)
                    {
                        positions.Add((position.X, position.Y));
                    }

                    assets.Add(new IoTAsset(assetData.AssetId, positions));
                }

                return assets;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error reading or parsing JSON file: {ex.Message}");
                return null;
            }
        }

        static void PrintAssetsHeader()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("| {0,-10} | {1,-20} |", "Asset ID", "Position (X, Y)");
            Console.WriteLine(new string('-', 35));  // Updated separator line
        }

        static void PrintAssetData(IoTAsset asset)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("| {0,-10} | {1,-20} |",
                asset.AssetId,
                $"({asset.X:F2}, {asset.Y:F2})");
        }
    }
}
