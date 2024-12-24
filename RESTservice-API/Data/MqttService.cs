using System.Text.Json;
using MQTTnet;
using MQTTnet.Client;
using RESTservice_API.Models;

namespace RESTservice_API.Data
{
    public class MqttService
    {
        private readonly IMqttClient _mqttClient;
        private readonly HttpClient _httpClient;
        private readonly IPositionHistoryRepository _positionHistoryRepository;
        private readonly string _topic = "assets/location";
        private readonly bool _useMockData;

        public MqttService(IConfiguration configuration, IPositionHistoryRepository positionHistoryRepository)
        {
            _mqttClient = new MqttFactory().CreateMqttClient();
            _httpClient = new HttpClient();
            _positionHistoryRepository = positionHistoryRepository;

            _useMockData = bool.Parse(configuration["UseMockData"] ?? "true");

            _mqttClient.ConnectedAsync += OnConnectedAsync;
            _mqttClient.DisconnectedAsync += OnDisconnectedAsync;
            _mqttClient.ApplicationMessageReceivedAsync += HandleMessageAsync;
        }

        public async Task StartAsync()
        {
            var options = new MqttClientOptionsBuilder()
                .WithClientId("RESTService")
                .WithTcpServer("localhost", 1883)
                .Build();

            await _mqttClient.ConnectAsync(options);
        }

        private Task OnConnectedAsync(MqttClientConnectedEventArgs e)
        {
            Console.WriteLine("Connected to MQTT Broker.");
            return _mqttClient.SubscribeAsync(new MqttTopicFilterBuilder().WithTopic(_topic).Build());
        }

        private Task OnDisconnectedAsync(MqttClientDisconnectedEventArgs e)
        {
            Console.WriteLine("Disconnected from MQTT Broker. Reconnecting...");
            return Task.Delay(TimeSpan.FromSeconds(5)).ContinueWith(async _ =>
            {
                try
                {
                    var options = new MqttClientOptionsBuilder()
                        .WithClientId("RESTService")
                        .WithTcpServer("localhost", 1883)
                        .Build();

                    await _mqttClient.ConnectAsync(options);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Reconnection failed: {ex.Message}");
                }
            });
        }

        private async Task HandleMessageAsync(MqttApplicationMessageReceivedEventArgs e)
        {
            try
            {
                var message = JsonSerializer.Deserialize<MqttMessage>(e.ApplicationMessage.Payload);
                if (message == null) return;
                Console.WriteLine($"MQTT Message Received: {message}");

                var positionHistory = new PositionHistory
                {
                    AssetId = message.asset_id,
                    X = message.x,
                    Y = message.y,
                    Timestamp = message.timestamp,
                    FloorMapId = 1
                };

                Console.WriteLine($"Deserialized PositionHistory: AssetId={positionHistory.AssetId}, X={positionHistory.X}, Y={positionHistory.Y}");

                if (_useMockData)
                {
                    _positionHistoryRepository.AddPositionHistory(positionHistory);
                    Console.WriteLine("PositionHistory added to mock data.");
                }
                else
                {
                    var response = await _httpClient.PostAsJsonAsync("/positionHistories", positionHistory);
                    if (response.IsSuccessStatusCode)
                    {
                        Console.WriteLine("PositionHistory sent to REST API.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to send PositionHistory: {response.StatusCode}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error handling MQTT message: {ex.Message}");
            }
        }
    }

    public class MqttMessage
    {
        public int asset_id { get; set; }
        public double x { get; set; }
        public double y { get; set; }
        public string status { get; set; }
        public DateTime timestamp { get; set; }
    }

}