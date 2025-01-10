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
using System.Linq;

namespace AssetDataSimulator
{
    public class ProgramSimulator
    {
        private static string brokerUrl = Environment.GetEnvironmentVariable("MQTT_BROKER_URL") ?? "localhost";
        private static int brokerPort = int.Parse(Environment.GetEnvironmentVariable("MQTT_BROKER_PORT") ?? "1883");
        private static string topic = Environment.GetEnvironmentVariable("ASSET_TOPIC") ?? "assets/location";
        private static int messageIntervalMilliseconds = int.Parse(Environment.GetEnvironmentVariable("MESSAGE_INTERVAL") ?? "1000");
        private static string jsonFilePath = FindJsonFilePath();
        private static string apiBaseUrl = Environment.GetEnvironmentVariable("API_BASE_URL") ?? "https://localhost:7018";
        private static double movementSpeed = 50.0;
        public static AssetSimulator simulator;
        private static Dictionary<string, List<Asset>> floorplans;

        public static event Action AssetsLoaded;

        private class LocalAssetJsonObject
        {
            public int AssetId { get; set; }
            public List<LocalPositionJsonObject> Positions { get; set; }
        }

        private class LocalPositionJsonObject
        {
            public double X { get; set; }
            public double Y { get; set; }
        }

        public static async Task Main(string[] args)
        {
            LoadEnv();
            OutputStartMessages();

            Console.WriteLine("Press any key to start...");
            if (!Console.IsInputRedirected)
            {
                Console.ReadKey();
            }

            var mqttClient = await SetupMqttClient();

            try
            {
                List<Asset> assets = new List<Asset>();
                List<Floorplan> floorplanList = new List<Floorplan>();
                bool usingFallback = false;

                var restLoader = new RestApiAssetLoader(apiBaseUrl);
                try
                {
                    Console.WriteLine($"Attempting to load data from REST API at {apiBaseUrl}...");
                    (assets, floorplanList) = await restLoader.LoadDataAsync();
                    Console.WriteLine("Successfully loaded data from REST API.");
                }
                catch (Exception apiEx)
                {
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    Console.WriteLine($"Failed to load from REST API: {apiEx.Message}");
                    Console.WriteLine("Falling back to local JSON file...");
                    Console.ForegroundColor = ConsoleColor.White;
                    
                    try
                    {
                        (assets, floorplanList) = await LoadDataFromJsonFile();
                        usingFallback = true;
                        Console.WriteLine("Successfully loaded data from local JSON file.");
                    }
                    catch (Exception jsonEx)
                    {
                        throw new Exception($"Failed to load data from both REST API and local JSON file.\nREST error: {apiEx.Message}\nJSON error: {jsonEx.Message}");
                    }
                }

                if (assets == null || assets.Count == 0)
                {
                    throw new Exception("No assets were loaded from any source.");
                }

                Console.WriteLine($"Successfully loaded {assets.Count} assets using {(usingFallback ? "local JSON file" : "REST API")}.");

                floorplans = new Dictionary<string, List<Asset>>();
                foreach (var floorplan in floorplanList)
                {
                    floorplans.Add(floorplan.Name, floorplan.Assets);
                }

                simulator = new AssetSimulator(assets, floorplanList, usingFallback ? null : restLoader);
                AssetsLoaded?.Invoke();

                Console.WriteLine("Simulating all available floorplans...");

                while (true)
                {
                    try
                    {
                        var simulatedDataList = simulator.SimulateNextStep(movementSpeed);
                        OutputAssetsStatusTable(simulator);
                        await PublishUpdatesToBroker(mqttClient, mqttClient.IsConnected, simulatedDataList);
                        await Task.Delay(messageIntervalMilliseconds);
                    }
                    catch (Exception ex)
                    {
                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine($"Simulation error: {ex.Message}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"Critical error: {ex.Message}");
                Console.WriteLine("Press any key to exit...");
            }
        }

        private static async Task<IMqttClient> SetupMqttClient()
        {
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

            try
            {
                await mqttClient.ConnectAsync(mqttOptions, CancellationToken.None);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect to MQTT broker: {ex.Message}");
            }

            return mqttClient;
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
            Console.WriteLine($"Message Interval: {messageIntervalMilliseconds} ms");
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
                    "MESSAGE_INTERVAL=1000",
                    "API_BASE_URL=https://localhost:7018"
                };

                File.WriteAllLines(fileName, defaultEnvContent);
            };

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
                $"({asset.X.ToString("F2", System.Globalization.CultureInfo.InvariantCulture)}, {asset.Y.ToString("F2", System.Globalization.CultureInfo.InvariantCulture)})");
        }

        private static string FindFileRecursively(string fileName)
        {
            string currentDirectory = Directory.GetCurrentDirectory();

            while (currentDirectory != null)
            {
                string filePath = Path.Combine(currentDirectory, fileName);
                if (File.Exists(filePath))
                {
                    return filePath;
                }

                currentDirectory = Directory.GetParent(currentDirectory)?.FullName;
            }

            throw new FileNotFoundException($"File '{fileName}' not found in the current directory or any parent directories.");
        }

        private static string FindJsonFilePath()
        {
            string jsonPath = "assets.json";
            if (File.Exists(jsonPath))
                return jsonPath;

            string simulatorControlPath = Path.Combine("..", "SimulatorControlUI", "assets.json");
            if (File.Exists(simulatorControlPath))
                return simulatorControlPath;

            return FindFileRecursively("assets.json");
        }

        public static async Task<(List<Asset>, List<Floorplan>)> LoadDataFromJsonFile()
        {
            string fullPath = FindJsonFilePath();
            Console.WriteLine($"Loading assets from: {fullPath}");

            if (!File.Exists(fullPath))
            {
                throw new FileNotFoundException($"assets.json not found. Looked in: {fullPath}");
            }

            var options = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            string jsonContent = File.ReadAllText(fullPath);
            var assetDataList = JsonSerializer.Deserialize<List<LocalAssetJsonObject>>(jsonContent, options);
            
            if (assetDataList == null || assetDataList.Count == 0)
            {
                throw new Exception("No assets found in the JSON file.");
            }

            Console.WriteLine($"Found {assetDataList.Count} assets in JSON file.");
            
            var assets = new List<Asset>();
            foreach (var assetData in assetDataList)
            {
                if (assetData.Positions == null || assetData.Positions.Count == 0)
                {
                    Console.WriteLine($"Warning: Asset {assetData.AssetId} has no positions defined, skipping.");
                    continue;
                }

                var positions = assetData.Positions.Select(p => (p.X, p.Y)).ToList();
                var asset = new Asset(assetData.AssetId, positions)
                {
                    FloorplanId = 1
                };
                assets.Add(asset);
            }

            var defaultFloorplan = new Floorplan("Default Floor") 
            { 
                FloorplanId = 1,
                Assets = assets
            };

            return (assets, new List<Floorplan> { defaultFloorplan });
        }
    }
}
