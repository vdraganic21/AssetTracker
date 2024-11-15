using System;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using MQTTnet;
using MQTTnet.Client;
using Microsoft.Extensions.Configuration;

namespace AssetDataSimulator
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // Load environment variables from .env file
            LoadEnv("config.env"); // Ensure the file is in the correct directory

            string brokerUrl = Environment.GetEnvironmentVariable("MQTT_BROKER_URL") ?? "localhost";
            int brokerPort = int.Parse(Environment.GetEnvironmentVariable("MQTT_BROKER_PORT") ?? "1883");
            string topic = Environment.GetEnvironmentVariable("ASSET_TOPIC") ?? "assets/location";
            int messageInterval = int.Parse(Environment.GetEnvironmentVariable("MESSAGE_INTERVAL") ?? "1000");

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

        // Method to load environment variables from a .env file
        static void LoadEnv(string fileName)
        {
            if (!System.IO.File.Exists(fileName)) return;

            foreach (var line in System.IO.File.ReadAllLines(fileName))
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
