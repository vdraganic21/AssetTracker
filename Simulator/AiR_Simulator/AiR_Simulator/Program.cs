using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.Configuration;
using System.IO;
using MQTTnet.Server;

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

            var rand = new Random();

            while (true)
            {
                var assetData = new
                {
                    asset_id = rand.Next(1, 101),
                    x = rand.Next(0, 500),
                    y = rand.Next(0, 500),
                    status = "active",
                    timestamp = DateTime.UtcNow.ToString("o")
                };

                string message = JsonSerializer.Serialize(assetData);
                Console.WriteLine($"Simulated Data: {message}");

                if (isConnected)
                {
                    var messagePayload = new MqttApplicationMessageBuilder()
                        .WithTopic(topic)
                        .WithPayload(message)
                        .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
                        .WithRetainFlag(false)
                        .Build();

                    try
                    {
                        await mqttClient.PublishAsync(messagePayload, CancellationToken.None);
                        Console.WriteLine($"Published to {topic}: {message}");
                    }
                    catch (Exception pubEx)
                    {
                        Console.WriteLine($"Failed to publish message: {pubEx.Message}");
                    }
                }

                await Task.Delay(messageInterval);
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

                var defaultEnvContent = new[]
                {
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
    }
}
