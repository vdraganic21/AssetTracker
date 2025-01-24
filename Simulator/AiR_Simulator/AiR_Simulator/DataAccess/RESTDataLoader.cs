using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http;
using System.Text.Json;
using System.IO;
using System.Linq;
using AiR_Simulator.Entities;
using AiR_Simulator.Utilities;
using AssetDataSimulator;

namespace AiR_Simulator.DataAccess
{
    public class FloorplanJsonObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageBase64 { get; set; }
        public List<AssetJsonObject> Assets { get; set; }
    }

    public class AssetJsonObject
    {
        public int? AssetId { get; set; }  // For JSON file
        public int Id { get; set; }        // For REST API
        public string Name { get; set; }
        public int FloorMapId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public bool Active { get; set; }
        public List<PositionJsonObject> Positions { get; set; }
    }

    public class PositionJsonObject
    {
        public double X { get; set; }
        public double Y { get; set; }
    }

    public interface IAssetDataLoader
    {
        Task<(List<Asset> Assets, List<Floorplan> Floorplans)> LoadDataAsync();
    }

    public class RestApiAssetLoader : IAssetDataLoader
    {
        private readonly string _baseUrl;
        private readonly HttpClient _httpClient;
        private List<FloorplanJsonObject> _floorplansData;

        public RestApiAssetLoader(string baseUrl, HttpClient httpClient = null)
        {
            _baseUrl = baseUrl;
            
            var handler = new HttpClientHandler
            {
                ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
            };
            
            _httpClient = httpClient ?? new HttpClient(handler);
            _httpClient.Timeout = TimeSpan.FromSeconds(30);

            _floorplansData = new List<FloorplanJsonObject>();
        }

        public async Task<(List<Asset> Assets, List<Floorplan> Floorplans)> LoadDataAsync()
        {
            try
            {
                var assets = new List<Asset>();
                var floorplans = new List<Floorplan>();

                Console.WriteLine($"Loading floorplans from {_baseUrl}/floormaps...");
                var floorplansResponse = await _httpClient.GetAsync($"{_baseUrl}/floormaps");
                floorplansResponse.EnsureSuccessStatusCode();
                var floorplansJson = await floorplansResponse.Content.ReadAsStringAsync();

                Console.WriteLine($"Loading assets from {_baseUrl}/assets...");
                var assetsResponse = await _httpClient.GetAsync($"{_baseUrl}/assets");
                assetsResponse.EnsureSuccessStatusCode();
                var assetsJson = await assetsResponse.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
                };

                _floorplansData = JsonSerializer.Deserialize<List<FloorplanJsonObject>>(floorplansJson, options);
                var assetsData = JsonSerializer.Deserialize<List<AssetJsonObject>>(assetsJson, options);

                var truncatedFloorplans = _floorplansData.Select(fp => new
                {
                    fp.Id,
                    fp.Name,
                    ImageBase64 = fp.ImageBase64?.Substring(0, Math.Min(20, fp.ImageBase64.Length)) + "...",
                    fp.Assets
                }).ToList();
                Console.WriteLine($"Floorplans: {JsonSerializer.Serialize(truncatedFloorplans)}");
                Console.WriteLine($"Assets: {assetsJson}");

                if (_floorplansData == null || _floorplansData.Count == 0)
                {
                    _floorplansData = new List<FloorplanJsonObject>
                    {
                        new FloorplanJsonObject { Id = 1, Name = "Floor 1" }
                    };
                }

                Console.WriteLine($"DEBUG: Starting floorplan processing. Count: {_floorplansData?.Count}");
                foreach (var floorplanData in _floorplansData)
                {
                    Console.WriteLine($"DEBUG: Processing floorplan - Id: {floorplanData.Id}, Name: {floorplanData.Name}");
                    var floorplan = new Floorplan(floorplanData.Name ?? "Floor 1")
                    {
                        FloorplanId = floorplanData.Id > 0 ? floorplanData.Id : 1,
                        Assets = new List<Asset>()
                    };
                    floorplans.Add(floorplan);
                    Console.WriteLine($"DEBUG: Added floorplan - Id: {floorplan.FloorplanId}, Name: {floorplan.Name}");
                }

                Console.WriteLine($"DEBUG: Starting asset processing. Count: {assetsData?.Count}");
                if (assetsData != null)
                {
                    foreach (var assetData in assetsData.Where(a => a.Active))
                    {
                        Console.WriteLine($"DEBUG: Processing asset - Id: {assetData.Id}, FloorMapId: {assetData.FloorMapId}");
                        var positions = new List<(double X, double Y)>
                        {
                            (assetData.X, assetData.Y)
                        };

                        var asset = new Asset(assetData.Id, positions)
                        {
                            FloorplanId = assetData.FloorMapId
                        };

                        Console.WriteLine($"Created asset {asset.AssetId}:");
                        Console.WriteLine($"  Position: ({asset.X}, {asset.Y})");
                        Console.WriteLine($"  FloorplanId: {asset.FloorplanId}");
                        Console.WriteLine($"  Has positions: {asset.Positions?.Count > 0}");
                        Console.WriteLine($"  IsManualControl: {asset.IsManualControl}");
                        assets.Add(asset);

                        var floorplan = floorplans.FirstOrDefault(f => f.FloorplanId == assetData.FloorMapId);
                        if (floorplan != null)
                        {
                            floorplan.Assets.Add(asset);
                        }
                    }
                }

                try
                {
                    var jsonPath = FileUtils.FindFileRecursively("assets.json");
                    Console.WriteLine($"Found assets.json at: {jsonPath}");
                    Console.WriteLine($"File exists: {File.Exists(jsonPath)}");
                    
                    var jsonContent = File.ReadAllText(jsonPath);
                    Console.WriteLine($"JSON file contents: {jsonContent}");
                    
                    var pathsData = JsonSerializer.Deserialize<List<AssetJsonObject>>(jsonContent, options);
                    Console.WriteLine($"Deserialized {pathsData?.Count} paths from JSON");

                    foreach (var pathData in pathsData)
                    {
                        var existingAsset = assets.FirstOrDefault(a => a.AssetId == (pathData.AssetId ?? pathData.Id));
                        if (existingAsset != null && pathData.Positions != null && pathData.Positions.Any())
                        {
                            var pathPositions = pathData.Positions.Select(p => (p.X, p.Y)).ToList();
                            Console.WriteLine($"Setting path for asset {existingAsset.AssetId} with {pathPositions.Count} positions");
                            existingAsset.SetPath(pathPositions);
                            Console.WriteLine($"Loaded path for asset {existingAsset.AssetId} with {pathPositions.Count} positions");
                        }
                        else
                        {
                            Console.WriteLine($"Could not load path for asset {pathData.AssetId ?? pathData.Id} - " +
                                $"Asset exists: {existingAsset != null}, " +
                                $"Has positions: {pathData.Positions != null && pathData.Positions.Any()}");
                        }
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Warning: Could not load paths from JSON: {ex.Message}");
                }

                Console.WriteLine($"Successfully loaded {assets.Count} assets from REST API");
                return (assets, floorplans);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"DEBUG: Exception stack trace: {ex.StackTrace}");
                throw new Exception($"Error processing API response: {ex.Message}", ex);
            }
        }

        public async Task<HttpResponseMessage> SendRequestAsync(HttpMethod method, string endpoint, HttpContent content = null)
        {
            var request = new HttpRequestMessage(method, $"{_baseUrl}/{endpoint}");
            if (content != null)
            {
                request.Content = content;
            }
            return await _httpClient.SendAsync(request);
        }

        public FloorplanJsonObject GetFloorplanData(string name)
        {
            return _floorplansData?.FirstOrDefault(f => f.Name == name);
        }

        private async Task<(List<Asset>, List<Floorplan>)> LoadJsonPaths(string jsonPath)
        {
            try
            {
                string jsonContent = File.ReadAllText(jsonPath);
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var assetDataList = JsonSerializer.Deserialize<List<AssetJsonObject>>(jsonContent, options);
                var assets = new List<Asset>();
                
                foreach (var assetData in assetDataList)
                {
                    var positions = assetData.Positions?.Select(p => (p.X, p.Y)).ToList() ?? new List<(double X, double Y)>();
                    var asset = new Asset(assetData.AssetId ?? assetData.Id, positions)
                    {
                        FloorplanId = 1
                    };
                    assets.Add(asset);
                }

                return (assets, new List<Floorplan>());
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading paths from JSON: {ex.Message}");
                return (new List<Asset>(), new List<Floorplan>());
            }
        }
    }

    public class CompositeAssetLoader : IAssetDataLoader
    {
        private readonly List<IAssetDataLoader> _loaders;

        public CompositeAssetLoader(params IAssetDataLoader[] loaders)
        {
            _loaders = new List<IAssetDataLoader>(loaders);
        }

        public async Task<(List<Asset> Assets, List<Floorplan> Floorplans)> LoadDataAsync()
        {
            var allAssets = new List<Asset>();
            var allFloorplans = new List<Floorplan>();
            var errors = new List<Exception>();

            foreach (var loader in _loaders)
            {
                try
                {
                    var (assets, floorplans) = await loader.LoadDataAsync();
                    allAssets.AddRange(assets);
                    allFloorplans.AddRange(floorplans);
                }
                catch (Exception ex)
                {
                    errors.Add(ex);
                    Console.WriteLine($"Error loading data: {ex.Message}");
                }
            }

            if (allAssets.Count == 0 && errors.Count == _loaders.Count)
            {
                throw new AggregateException("All data sources failed to load.", errors);
            }

            return (allAssets, allFloorplans);
        }
    }

    public static class FloorplanDataProcessor
    {
        public static void ProcessFloorplanData(
            List<FloorplanJsonObject> floorplansData,
            List<Asset> assets,
            List<Floorplan> floorplans)
        {
            Console.WriteLine($"Starting to process {floorplansData?.Count ?? 0} floorplans");
            
            if (floorplansData == null) throw new ArgumentNullException(nameof(floorplansData));
            if (assets == null) throw new ArgumentNullException(nameof(assets));
            if (floorplans == null) throw new ArgumentNullException(nameof(floorplans));

            foreach (var floorplanData in floorplansData)
            {
                Console.WriteLine($"Processing floorplan: {floorplanData?.Name ?? "null"}");
                Console.WriteLine($"Assets count: {floorplanData?.Assets?.Count ?? 0}");

                if (string.IsNullOrEmpty(floorplanData?.Name))
                {
                    Console.WriteLine("Warning: Skipping floorplan with null name");
                    continue;
                }

                var floorplan = new Floorplan(floorplanData.Name)
                {
                    FloorplanId = floorplanData.Id,
                    Assets = new List<Asset>()
                };

                if (floorplanData.Assets != null)
                {
                    foreach (var assetData in floorplanData.Assets)
                    {
                        Console.WriteLine($"  Processing asset ID: {assetData?.Id}");
                        Console.WriteLine($"  Positions count: {assetData?.Positions?.Count ?? 0}");

                        if (assetData?.Positions == null) continue;

                        var positions = assetData.Positions
                            .Where(p => p != null)
                            .Select(p => (p.X, p.Y))
                            .ToList();

                        var asset = new Asset(assetData.Id, positions)
                        {
                            FloorplanId = floorplan.FloorplanId
                        };

                        floorplan.Assets.Add(asset);
                        assets.Add(asset);
                    }
                }

                floorplans.Add(floorplan);
            }
        }
    }
}