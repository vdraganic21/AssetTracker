using System.ComponentModel.DataAnnotations;
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
        private readonly IAssetRepository _assetRepository;
        public MqttService(IConfiguration configuration, IPositionHistoryRepository positionHistoryRepository, IAssetRepository assetRepository)
        {
            _mqttClient = new MqttFactory().CreateMqttClient();
            _httpClient = new HttpClient();
            _positionHistoryRepository = positionHistoryRepository;
            _assetRepository = assetRepository;

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

        private int getFloormapId(string floormap)
        {
            int i = floormap.Length - 1;
            while (i >= 0 && char.IsDigit(floormap[i]))
            {
                i--;
            }

            string numericPart = floormap.Substring(i + 1);

            if (int.TryParse(numericPart, out int floormapId))
            {
                return floormapId;
            }

            throw new ArgumentException($"The provided string '{floormap}' does not contain a valid integer at the end.");
        }


        private async Task HandleMessageAsync(MqttApplicationMessageReceivedEventArgs e)
        {
            try
            {
                var message = JsonSerializer.Deserialize<MqttMessage>(e.ApplicationMessage.Payload);
                if (message == null) return;

                var validationResults = new List<ValidationResult>();
                var validationContext = new ValidationContext(message);

                if (!Validator.TryValidateObject(message, validationContext, validationResults, true))
                {
                    foreach (var validationResult in validationResults)
                    {
                        Console.WriteLine($"Validation failed: {validationResult.ErrorMessage}");
                    }
                    return;
                }

                var positionHistory = new PositionHistory
                {
                    AssetId = message.asset_id,
                    X = message.x,
                    Y = message.y,
                    Timestamp = message.timestamp,
                    FloorMapId = getFloormapId(message.floorplan)
                };

                Console.WriteLine($"Deserialized PositionHistory: AssetId={positionHistory.AssetId}, X={positionHistory.X}, Y={positionHistory.Y}");

                if (_useMockData)
                {
                    _positionHistoryRepository.AddPositionHistory(positionHistory);
                    Console.WriteLine("PositionHistory added to mock data.");

                    var asset = new Asset
                    {
                        Id = message.asset_id,
                        Name = $"Asset {message.asset_id}",
                        X = message.x,
                        Y = message.y,
                        Active = message.status == "active",
                        FloorMapId = getFloormapId(message.floorplan)
                    };

                    _assetRepository.UpdateAsset(asset);
                    Console.WriteLine("Asset updated in mock repository.");
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

        public class MqttMessage
        {
            [Required]
            public int asset_id { get; set; }

            [Range(-100000, 100000)]
            public double x { get; set; }

            [Range(-100000, 100000)]
            public double y { get; set; }

            [StringLength(100)]
            public string floorplan { get; set; }

            [Required]
            [RegularExpression("active|inactive", ErrorMessage = "Status must be either 'active' or 'inactive'.")]
            public string status { get; set; }

            [Required]
            public DateTime timestamp { get; set; }
        }

    }
}