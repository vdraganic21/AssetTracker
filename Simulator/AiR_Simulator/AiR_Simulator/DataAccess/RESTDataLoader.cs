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
        public List<ZoneJsonObject> Zones { get; set; }
    }

    public class ZoneJsonObject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int FloorMapId { get; set; }
        public string Points { get; set; }
    }

    public class AssetJsonObject
    {
        public int? AssetId { get; set; }  // For JSON file
        public int Id { get; set; }        // For REST API
        public string Name { get; set; }
        public int? FloorMapId { get; set; }
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
            var assets = new List<Asset>();
            var floorplans = new List<Floorplan>();

            try
            {
                Console.WriteLine($"Starting LoadDataAsync at {DateTime.Now}");
                Console.WriteLine($"Base URL: {_baseUrl}");

                Console.WriteLine($"HttpClient Timeout: {_httpClient.Timeout}");
                Console.WriteLine($"HttpClient BaseAddress: {_httpClient.BaseAddress}");

                HttpResponseMessage floorplansResponse = null;
                HttpResponseMessage assetsResponse = null;
                string floorplansJson = null;
                string assetsJson = null;

                try 
                {
                    Console.WriteLine("Attempting to fetch floorplans...");
                    floorplansResponse = await _httpClient.GetAsync($"{_baseUrl}/floormaps");
                    floorplansResponse.EnsureSuccessStatusCode();
                    floorplansJson = await floorplansResponse.Content.ReadAsStringAsync();
                    
                    Console.WriteLine("Attempting to fetch assets...");
                    assetsResponse = await _httpClient.GetAsync($"{_baseUrl}/assets");
                    assetsResponse.EnsureSuccessStatusCode();
                    assetsJson = await assetsResponse.Content.ReadAsStringAsync();
                }
                catch (HttpRequestException httpEx)
                {
                    Console.WriteLine($"HTTP Request Error: {httpEx.Message}");
                    Console.WriteLine($"Floorplans Response: {floorplansResponse?.StatusCode}");
                    Console.WriteLine($"Assets Response: {assetsResponse?.StatusCode}");
                    throw;
                }

                Console.WriteLine($"Floorplans JSON Length: {floorplansJson?.Length ?? 0}");
                Console.WriteLine($"Assets JSON Length: {assetsJson?.Length ?? 0}");
                
                if (string.IsNullOrWhiteSpace(floorplansJson))
                {
                    Console.WriteLine("WARNING: Floorplans JSON is empty or null!");
                    floorplansJson = "[]";
                }

                if (string.IsNullOrWhiteSpace(assetsJson))
                {
                    Console.WriteLine("WARNING: Assets JSON is empty or null!");
                    assetsJson = "[]";
                }

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                    AllowTrailingCommas = true,
                    ReadCommentHandling = JsonCommentHandling.Skip,
                    WriteIndented = true
                };

                List<FloorplanJsonObject> floorplanData = null;
                List<AssetJsonObject> assetData = null;

                try 
                {
                    Console.WriteLine("Attempting to deserialize floorplans...");
                    Console.WriteLine($"First 500 chars of floorplans JSON: {floorplansJson.Substring(0, Math.Min(500, floorplansJson.Length))}");
                    
                    try 
                    {
                        floorplanData = JsonSerializer.Deserialize<List<FloorplanJsonObject>>(floorplansJson, options);
                    }
                    catch (JsonException)
                    {
                        var alternativeOptions = new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true,
                            PropertyNamingPolicy = null,
                            AllowTrailingCommas = true,
                            ReadCommentHandling = JsonCommentHandling.Skip
                        };
                        
                        floorplanData = JsonSerializer.Deserialize<List<FloorplanJsonObject>>(floorplansJson, alternativeOptions);
                    }
                    
                    Console.WriteLine($"Deserialized {floorplanData?.Count ?? 0} floorplans");
                    
                    if (floorplanData != null)
                    {
                        foreach (var fp in floorplanData)
                        {
                            Console.WriteLine($"Floorplan Details:");
                            Console.WriteLine($"  ID: {fp.Id}");
                            Console.WriteLine($"  Name: {fp.Name}");
                            Console.WriteLine($"  Image Base64 Length: {fp.ImageBase64?.Length ?? 0}");
                            Console.WriteLine($"  Assets Count: {fp.Assets?.Count ?? 0}");
                            Console.WriteLine($"  Zones Count: {fp.Zones?.Count ?? 0}");
                        }
                    }
                }
                catch (JsonException jsonEx)
                {
                    Console.WriteLine($"CRITICAL JSON Deserialization Error for Floorplans: {jsonEx.Message}");
                    Console.WriteLine($"Full JSON Content: {floorplansJson}");
                    Console.WriteLine($"Path: {jsonEx.Path}");
                    Console.WriteLine($"LineNumber: {jsonEx.LineNumber}");
                    Console.WriteLine($"BytePositionInLine: {jsonEx.BytePositionInLine}");
                    
                    try 
                    {
                        floorplansJson = floorplansJson.Trim();
                        
                        if (!floorplansJson.StartsWith("[") || !floorplansJson.EndsWith("]"))
                        {
                            Console.WriteLine("JSON does not appear to be a valid array. Attempting to fix...");
                            floorplansJson = $"[{floorplansJson}]";
                        }
                        
                        floorplanData = JsonSerializer.Deserialize<List<FloorplanJsonObject>>(floorplansJson, options);
                    }
                    catch (Exception fallbackEx)
                    {
                        Console.WriteLine($"FALLBACK Parsing Failed: {fallbackEx.Message}");
                        
                        floorplanData = new List<FloorplanJsonObject>
                        {
                            new FloorplanJsonObject 
                            { 
                                Id = 1, 
                                Name = "Default Floorplan", 
                                ImageBase64 = null,
                                Assets = new List<AssetJsonObject>(),
                                Zones = new List<ZoneJsonObject>()
                            }
                        };
                    }
                }

                try 
                {
                    Console.WriteLine("Attempting to deserialize assets...");
                    Console.WriteLine($"First 500 chars of assets JSON: {assetsJson.Substring(0, Math.Min(500, assetsJson.Length))}");
                    
                    assetData = JsonSerializer.Deserialize<List<AssetJsonObject>>(assetsJson, options);
                    
                    Console.WriteLine($"Deserialized {assetData?.Count ?? 0} assets");
                    if (assetData != null)
                    {
                        foreach (var asset in assetData)
                        {
                            Console.WriteLine($"Asset - ID: {asset.Id}, FloorMapId: {asset.FloorMapId}, Active: {asset.Active}, X: {asset.X}, Y: {asset.Y}");
                        }
                    }
                }
                catch (JsonException jsonEx)
                {
                    Console.WriteLine($"JSON Deserialization Error for Assets: {jsonEx.Message}");
                    Console.WriteLine($"Path: {jsonEx.Path}");
                    Console.WriteLine($"LineNumber: {jsonEx.LineNumber}");
                    Console.WriteLine($"BytePositionInLine: {jsonEx.BytePositionInLine}");
                    throw;
                }

                floorplanData ??= new List<FloorplanJsonObject> 
                { 
                    new FloorplanJsonObject { Id = 1, Name = "Default Floor" } 
                };

                foreach (var fp in floorplanData)
                {
                    var floorplan = new Floorplan(fp.Name ?? $"Floor {fp.Id}")
                    {
                        FloorplanId = fp.Id,
                        ImageBase64 = fp.ImageBase64
                    };

                    floorplans.Add(floorplan);
                }

                if (assetData != null)
                {
                    foreach (var assetItem in assetData.Where(a => a.Active))
                    {
                        if (!assetItem.FloorMapId.HasValue)
                        {
                            Console.WriteLine($"WARNING: Asset {assetItem.Id} ({assetItem.Name}) has no FloorMapId. Assigning default.");
                        }

                        var asset = new Asset(assetItem.Id, new List<(double X, double Y)> { (assetItem.X, assetItem.Y) })
                        {
                            FloorplanId = assetItem.FloorMapId ?? 1
                        };

                        assets.Add(asset);

                        var matchingFloorplan = floorplans.FirstOrDefault(f => f.FloorplanId == asset.FloorplanId);
                        if (matchingFloorplan != null)
                        {
                            matchingFloorplan.Assets.Add(asset);
                        }
                        else
                        {
                            Console.WriteLine($"WARNING: No matching floorplan found for asset {asset.AssetId} with FloorMapId {asset.FloorplanId}. Using first available floorplan.");
                            
                            if (floorplans.Any())
                            {
                                floorplans.First().Assets.Add(asset);
                            }
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

                Console.WriteLine($"Final Summary:");
                Console.WriteLine($"Total Floorplans: {floorplans.Count}");
                Console.WriteLine($"Total Assets: {assets.Count}");
                foreach (var floorplan in floorplans)
                {
                    Console.WriteLine($"Floorplan {floorplan.FloorplanId} ({floorplan.Name}): {floorplan.Assets.Count} assets");
                }

                return (assets, floorplans);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"CRITICAL ERROR in LoadDataAsync: {ex.GetType().Name}");
                Console.WriteLine($"Message: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException.GetType().Name}");
                    Console.WriteLine($"Inner Message: {ex.InnerException.Message}");
                    Console.WriteLine($"Inner Stack Trace: {ex.InnerException.StackTrace}");
                }

                throw;
            }
        }

        private string CleanupJson(string json)
        {
            if (string.IsNullOrWhiteSpace(json)) return "[]";

            json = json.Trim();

            if (!json.StartsWith("[")) json = "[" + json;
            if (!json.EndsWith("]")) json += "]";

            json = System.Text.RegularExpressions.Regex.Replace(json, @",\s*]", "]");

            return json;
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
                        FloorplanId = assetData.FloorMapId ?? 1
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