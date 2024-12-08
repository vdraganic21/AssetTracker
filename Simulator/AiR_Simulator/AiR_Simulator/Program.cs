using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Collections.Generic;
using AiR_Simulator.DataAccess;
using AiR_Simulator.Entities;

namespace AssetDataSimulator
{
    class Program
    {
        private static string brokerUrl = Environment.GetEnvironmentVariable("MQTT_BROKER_URL") ?? "localhost";
        private static int brokerPort = int.Parse(Environment.GetEnvironmentVariable("MQTT_BROKER_PORT") ?? "1883");
        private static string topic = Environment.GetEnvironmentVariable("ASSET_TOPIC") ?? "assets/location";
        private static int messageIntervalMiliseconds = int.Parse(Environment.GetEnvironmentVariable("MESSAGE_INTERVAL") ?? "1000");
        private static string jsonFilePath = "../../assets.json";
        private static double movementSpeed = 1.0;
        
        static async Task Main(string[] args)
        {
            LoadEnv();

            OutputStartMessages();

            Console.WriteLine("Press any key to start...");
            Console.ReadKey();

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

            var assets = AssetJsonLoader.Load(jsonFilePath);

            if (assets == null || assets.Count == 0)
            {
                Console.WriteLine("No assets were initialized from the JSON file.");
                return;
            }

            var simulator = new AssetSimulator(assets);

            while (true)
            {
                try
                {
                    var simulatedDataList = simulator.SimulateNextStep(movementSpeed);

                    OutputAssetsStatusTable(simulator);

                    await PublishUpdatesToBroker(mqttClient, isConnected, simulatedDataList);

                    await Task.Delay(messageIntervalMiliseconds);
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"Simulation error: {ex.Message}");
                }
            }
        }

        private static async Task PublishUpdatesToBroker(IMqttClient mqttClient, bool isConnected, List<string> simulatedDataList)
        {
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
        }

        private static void OutputAssetsStatusTable(AssetSimulator simulator)
        {
            PrintAssetsHeader();

            foreach (var asset in simulator.Assets)
            {
                PrintAssetData(asset);
            }
        }

        private static void OutputStartMessages()
        {
            Console.WriteLine($"Broker URL: {brokerUrl}");
            Console.WriteLine($"Broker Port: {brokerPort}");
            Console.WriteLine($"Topic: {topic}");
            Console.WriteLine($"Message Interval: {messageIntervalMiliseconds} ms");
            Console.WriteLine("##########################################");
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

        static void PrintAssetsHeader()
        {
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("| {0,-10} | {1,-20} |", "Asset ID", "Position (X, Y)");
            Console.WriteLine(new string('-', 35));
        }

        static void PrintAssetData(Asset asset)
        {
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("| {0,-10} | {1,-20} |",
                asset.AssetId,
                $"({asset.X:F2}, {asset.Y:F2})");
        }
    }
}
