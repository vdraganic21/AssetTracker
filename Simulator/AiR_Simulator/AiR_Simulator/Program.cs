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
            // Load configuration from environment variables
            var config = new ConfigurationBuilder()
                .Build();

            string brokerUrl = config["MQTT_BROKER_URL"] ?? "localhost";
            int brokerPort = int.Parse(config["MQTT_BROKER_PORT"] ?? "1883");
            string topic = config["ASSET_TOPIC"] ?? "assets/location";
            int messageInterval = int.Parse(config["MESSAGE_INTERVAL"] ?? "1000");

            // Create MQTT client
            var mqttFactory = new MqttFactory();
            var mqttClient = mqttFactory.CreateMqttClient();

            // Define options using WithTcpServer and build it
            var mqttOptions = new MqttClientOptionsBuilder()
                .WithTcpServer(brokerUrl, brokerPort)
                .WithCleanSession()
                .Build();

            // Setup event handlers
            mqttClient.ConnectedAsync += async e =>
            {
                Console.WriteLine($"Connected to MQTT broker at {brokerUrl}:{brokerPort}");
                await Task.CompletedTask; // Since ConnectedAsync expects a Task
            };

            mqttClient.DisconnectedAsync += async e =>
            {
                Console.WriteLine($"Disconnected from MQTT broker: {e.Exception?.Message}");
                await Task.CompletedTask; // Since DisconnectedAsync expects a Task
            };

            try
            {
                await mqttClient.ConnectAsync(mqttOptions, CancellationToken.None);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to connect: {ex.Message}");
                return;
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
                var messagePayload = new MqttApplicationMessageBuilder()
                    .WithTopic(topic)
                    .WithPayload(message)
                    .WithQualityOfServiceLevel(MQTTnet.Protocol.MqttQualityOfServiceLevel.AtLeastOnce)
                    .WithRetainFlag(false)
                    .Build();

                await mqttClient.PublishAsync(messagePayload, CancellationToken.None);
                Console.WriteLine($"Published to {topic}: {message}");

                await Task.Delay(messageInterval);
            }
        }
    }
}