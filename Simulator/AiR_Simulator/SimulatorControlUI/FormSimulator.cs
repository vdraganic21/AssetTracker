using System;
using System.Drawing;
using System.Windows.Forms;
using AssetDataSimulator;
using AiR_Simulator.Entities;
using AiR_Simulator.DataAccess;
using System.IO;
using System;

namespace SimulatorControlUI
{
    public partial class FormSimulator : Form
    {
        private Asset selectedAsset;
        private Floorplan selectedFloorplan;
        private System.Windows.Forms.Timer refreshTimer;

        private const float MapScale = 10f;
        private const float AssetRadius = 5f;
        private const float TargetRadius = 3f;

        public FormSimulator()
        {
            InitializeComponent();
            StartSimulator();
            StartAutoRefresh();

            MapPictureBox.Paint += MapPictureBox_Paint;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Console.WriteLine("Form loaded successfully!");
        }

        private void StartSimulator()
        {
            ProgramSimulator.AssetsLoaded += OnAssetsLoaded;

            Task.Run(async () =>
            {
                await ProgramSimulator.Main(new string[] { "--gui" });
            });
        }

        private void OnAssetsLoaded()
        {
            if (this.InvokeRequired)
            {
                this.Invoke((MethodInvoker)OnAssetsLoaded);
            }
            else
            {
                if (ProgramSimulator.simulator != null && ProgramSimulator.simulator.Assets != null && ProgramSimulator.simulator.Assets.Count > 0)
                {
                    PopulateFloorplanList();

                    foreach (var asset in ProgramSimulator.simulator.Assets)
                    {
                        if (asset.TargetPosition == null)
                        {
                            asset.TargetPosition = new Position 
                            { 
                                X = asset.Position.X,
                                Y = asset.Position.Y,
                                FloorplanName = asset.Position.FloorplanName
                            };
                        }
                    }

                    MapPictureBox.Invalidate();
                }
                else
                {
                    MessageBox.Show("Failed to load assets. Check simulator initialization.");
                }
            }
        }

        private void PopulateFloorplanList()
        {
            if (this.InvokeRequired)
            {
                this.Invoke((MethodInvoker)PopulateFloorplanList);
            }
            else
            {
                var simulatorInstance = ProgramSimulator.simulator;

                if (simulatorInstance == null || simulatorInstance.Floorplans == null || simulatorInstance.Floorplans.Count == 0)
                {
                    MessageBox.Show("No floorplans available.");
                    return;
                }

                FloorplanSelectorComboBox.Items.Clear();

                foreach (var floorplan in simulatorInstance.Floorplans)
                {
                    FloorplanSelectorComboBox.Items.Add(floorplan.Name);
                }

                if (simulatorInstance.Floorplans.Count > 0)
                {
                    FloorplanSelectorComboBox.SelectedIndex = 0;
                    selectedFloorplan = simulatorInstance.Floorplans[0];
                }
            }
        }

        private void PopulateAssetListForSelectedFloorplan()
        {
            if (this.InvokeRequired)
            {
                this.Invoke((MethodInvoker)PopulateAssetListForSelectedFloorplan);
            }
            else
            {
                var simulatorInstance = ProgramSimulator.simulator;

                if (simulatorInstance == null || simulatorInstance.Assets == null || simulatorInstance.Assets.Count == 0)
                {
                    MessageBox.Show("Simulator or assets are not properly initialized.");
                    return;
                }

                AssetSelectorComboBox.Items.Clear();

                foreach (var asset in selectedFloorplan.Assets)
                {
                    AssetSelectorComboBox.Items.Add($"Asset {asset.AssetId}");
                }

                if (selectedFloorplan.Assets.Count > 0)
                {
                    AssetSelectorComboBox.SelectedIndex = 0;
                    selectedAsset = selectedFloorplan.Assets[0];
                }
            }
        }

        private void AssetSelectorComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            var selectedAssetName = AssetSelectorComboBox.SelectedItem as string;
            if (selectedAssetName != null)
            {
                int assetId = int.Parse(selectedAssetName.Replace("Asset ", ""));
                selectedAsset = selectedFloorplan?.Assets.FirstOrDefault(a => a.AssetId == assetId);
                MapPictureBox.Invalidate();
            }
        }

        private void MapPictureBox_Paint(object sender, PaintEventArgs e)
        {
            if (selectedFloorplan == null)
            {
                return;
            }

            DrawAssets(e.Graphics, selectedFloorplan.Assets);
        }

        private void DrawAssets(Graphics g, List<Asset> assets)
        {
            DrawGrid(g);
            
            var simulatorInstance = ProgramSimulator.simulator;

            if (simulatorInstance == null || simulatorInstance.Assets == null)
            {
                Console.WriteLine("Simulator instance or assets are null.");
                return;
            }

            var imageSize = MapPictureBox.BackgroundImage?.Size ?? new Size(1, 1);
            float scaleX = MapPictureBox.Width / (float)imageSize.Width;
            float scaleY = MapPictureBox.Height / (float)imageSize.Height;

            Console.WriteLine($"MapPictureBox Size: {MapPictureBox.Width}x{MapPictureBox.Height}");
            Console.WriteLine($"Background Image Size: {imageSize.Width}x{imageSize.Height}");
            Console.WriteLine($"ScaleX: {scaleX}, ScaleY: {scaleY}");

            foreach (var asset in assets)
            {
                var brush = (asset == selectedAsset) ? Brushes.Green : Brushes.Blue;

                // Calculate scaled positions using the scale factors
                float scaledX = (float)(asset.X * scaleX);
                float scaledY = (float)((imageSize.Height - asset.Y) * scaleY);

                Console.WriteLine($"Drawing Asset ID: {asset.AssetId}, Original Position: ({asset.X}, {asset.Y}), Scaled Position: ({scaledX}, {scaledY})");

                // Check if the calculated positions are within the bounds of the image
                if (scaledX >= 0 && scaledX <= imageSize.Width && scaledY >= 0 && scaledY <= imageSize.Height)
                {
                    g.FillEllipse(brush,
                        scaledX - AssetRadius,
                        scaledY - AssetRadius,
                        AssetRadius * 2,
                        AssetRadius * 2);

                    g.DrawString(asset.AssetId.ToString(), this.Font, Brushes.Black,
                        scaledX,
                        scaledY);
                }
                else
                {
                    Console.WriteLine($"Asset ID: {asset.AssetId} is out of bounds: ({scaledX}, {scaledY})");
                }

                if (asset.HasTarget())
                {
                    g.DrawLine(Pens.Gray,
                        scaledX,
                        scaledY,
                        (float)(asset.TargetX * scaleX),
                        (float)((imageSize.Height - asset.TargetY) * scaleY));

                    g.FillEllipse(Brushes.Red,
                        (float)(asset.TargetX * scaleX - TargetRadius),
                        (float)((imageSize.Height - asset.TargetY) * scaleY - TargetRadius),
                        TargetRadius * 2,
                        TargetRadius * 2);
                }
            }
        }

        private void MapPictureBox_MouseClick(object? sender, MouseEventArgs e)
        {
            double clickX = e.X;
            double clickY = e.Y;

            Console.WriteLine($"Mouse Clicked at: ({clickX}, {clickY})");

            if (selectedFloorplan?.Assets == null) return;

            // Get the size of the background image
            var imageSize = MapPictureBox.BackgroundImage?.Size ?? new Size(1, 1);
            
            float scaleX = MapPictureBox.Width / (float)imageSize.Width;
            float scaleY = MapPictureBox.Height / (float)imageSize.Height;

            Asset? clickedAsset = null;
            double closestDistance = double.MaxValue;

            foreach (var asset in selectedFloorplan.Assets)
            {
                // Calculate the distance from the click to the asset's position
                double dx = asset.X - clickX;
                double dy = asset.Y - clickY;
                double distance = Math.Sqrt(dx * dx + dy * dy);

                if (distance < closestDistance)
                {
                    closestDistance = distance;
                    clickedAsset = asset;
                }
            }

            if (clickedAsset != null && closestDistance < 3) // Check if the click is close enough to the asset
            {
                selectedAsset = clickedAsset;
                int index = AssetSelectorComboBox.Items.IndexOf($"Asset {clickedAsset.AssetId}");
                if (index >= 0)
                {
                    AssetSelectorComboBox.SelectedIndex = index;
                }
                MapPictureBox.Invalidate();
            }
            else if (selectedAsset != null)
            {
                selectedAsset.SetManualTarget(clickX / scaleX, imageSize.Height - (clickY / scaleY));
                Console.WriteLine($"Setting target for Asset ID: {selectedAsset.AssetId} to ({clickX / scaleX}, {imageSize.Height - (clickY / scaleY)})");
                MapPictureBox.Invalidate();
            }
        }

        private void StartAutoRefresh()
        {
            refreshTimer = new System.Windows.Forms.Timer();
            refreshTimer.Interval = 100;
            refreshTimer.Tick += RefreshTimer_Tick;
            refreshTimer.Start();
        }

        private void RefreshTimer_Tick(object sender, EventArgs e)
        {
            MapPictureBox.Invalidate();
        }

        private void RefreshButton_Click(object sender, EventArgs e)
        {
            MapPictureBox.Invalidate();
        }
        private void LegendPanel_Paint(object sender, PaintEventArgs e)
        {
            Graphics g = e.Graphics;

            const float LegendItemHeight = 20f;
            const float LegendItemWidth = 20f;
            const float TextOffset = 30f;
            float yPosition = 10f;

            g.FillEllipse(Brushes.Blue, 10, yPosition, LegendItemWidth, LegendItemHeight);
            g.DrawString("Asset Position", this.Font, Brushes.Black, 40, yPosition);

            yPosition += LegendItemHeight + 10;

            g.FillEllipse(Brushes.Green, 10, yPosition, LegendItemWidth, LegendItemHeight);
            g.DrawString("Selected Asset", this.Font, Brushes.Black, 40, yPosition);

            yPosition += LegendItemHeight + 10;

            g.FillEllipse(Brushes.Red, 10, yPosition, LegendItemWidth, LegendItemHeight);
            g.DrawString("Target Position", this.Font, Brushes.Black, 40, yPosition);

            yPosition += LegendItemHeight + 10;

            g.DrawString("ID Label: Asset ID", this.Font, Brushes.Black, 10, yPosition);
        }

        private void FloorplanSelectorComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            string selectedFloorplanName = FloorplanSelectorComboBox.SelectedItem as string;

            if (string.IsNullOrEmpty(selectedFloorplanName)) return;

            var simulatorInstance = ProgramSimulator.simulator;

            if (simulatorInstance != null)
            {
                selectedFloorplan = simulatorInstance.Floorplans
                    .FirstOrDefault(floorplan => floorplan.Name == selectedFloorplanName);

                if (selectedFloorplan != null)
                {
                    SetFloorplanBackground(selectedFloorplanName);

                    PopulateAssetListForSelectedFloorplan();

                    MapPictureBox.Invalidate();
                }
                else
                {
                    MessageBox.Show($"Floorplan '{selectedFloorplanName}' not found.");
                }
            }
        }

        private void SetFloorplanBackground(string floorplanName)
        {
            if (ProgramSimulator.simulator?.RestLoader is RestApiAssetLoader restLoader)
            {
                Console.WriteLine($"Getting floorplan data for: {floorplanName}");
                var floorplanData = restLoader.GetFloorplanData(floorplanName);
                
                if (floorplanData == null)
                {
                    Console.WriteLine("FloorplanData is null");
                    MessageBox.Show($"No floorplan data found for '{floorplanName}'");
                    return;
                }

                if (string.IsNullOrEmpty(floorplanData.ImageBase64))
                {
                    Console.WriteLine("ImageBase64 is null or empty");
                    MessageBox.Show($"No image data found for floorplan '{floorplanName}'");
                    return;
                }

                try
                {
                    Console.WriteLine("Converting base64 to image...");
                    string base64Data = floorplanData.ImageBase64;
                    if (base64Data.Contains(","))
                    {
                        base64Data = base64Data.Split(',')[1];
                    }
                    
                    byte[] imageBytes = Convert.FromBase64String(base64Data);
                    using (var ms = new MemoryStream(imageBytes))
                    {
                        MapPictureBox.BackgroundImage = Image.FromStream(ms);
                        MapPictureBox.BackgroundImageLayout = ImageLayout.Stretch;
                        Console.WriteLine("Successfully set background image");
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Failed to load base64 image: {ex.Message}");
                    MessageBox.Show($"Failed to load image for floorplan '{floorplanName}': {ex.Message}");
                }
            }
            else
            {
                Console.WriteLine("RestLoader is not available");
                MessageBox.Show("REST loader is not properly initialized");
            }
        }

        private void DrawGrid(Graphics g)
        {
            for (int i = 0; i < MapPictureBox.Width; i += 20)
            {
                g.DrawLine(Pens.LightGray, i, 0, i, MapPictureBox.Height);
            }
            for (int j = 0; j < MapPictureBox.Height; j += 20)
            {
                g.DrawLine(Pens.LightGray, 0, j, MapPictureBox.Width, j);
            }
        }

    }
}
