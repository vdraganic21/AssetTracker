using System;
using System.Drawing;
using System.Windows.Forms;
using AssetDataSimulator;
using AiR_Simulator.Entities;
using AiR_Simulator.DataAccess;

namespace SimulatorControlUI
{
    public partial class Form1 : Form
    {
        private Asset selectedAsset;
        private Floorplan selectedFloorplan;
        private System.Windows.Forms.Timer refreshTimer;

        public Form1()
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
                await ProgramSimulator.Main(new string[] { });
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
            var selectedIndex = AssetSelectorComboBox.SelectedIndex;
            var simulatorInstance = ProgramSimulator.simulator;
            if (selectedIndex >= 0)
            {
                selectedAsset = simulatorInstance.Assets[selectedIndex];
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
            var simulatorInstance = ProgramSimulator.simulator;

            if (simulatorInstance == null || simulatorInstance.Assets == null)
            {
                return;
            }

            const float MapScale = 10f;
            const float AssetRadius = 5f;
            const float TargetRadius = 3f;

            foreach (var asset in assets)
            {
                // Draw the asset as a blue circle
                g.FillEllipse(Brushes.Blue,
                    (float)(asset.X * MapScale - AssetRadius),
                    (float)(asset.Y * MapScale - AssetRadius),
                    AssetRadius * 2,
                    AssetRadius * 2);

                // Draw the asset ID
                g.DrawString(asset.AssetId.ToString(), this.Font, Brushes.Black,
                    (float)(asset.X * MapScale),
                    (float)(asset.Y * MapScale));

                if (asset.HasTarget())
                {
                    g.FillEllipse(Brushes.Red,
                        (float)(asset.TargetX * MapScale - TargetRadius),
                        (float)(asset.TargetY * MapScale - TargetRadius),
                        TargetRadius * 2,
                        TargetRadius * 2);

                    // Draw the asset ID next to the red dot (target)
                    g.DrawString(asset.AssetId.ToString(), this.Font, Brushes.Black,
                        (float)(asset.TargetX * MapScale) + 5,
                        (float)(asset.TargetY * MapScale) + 5);
                }
            }
        }



        private void MapPictureBox_MouseClick(object sender, MouseEventArgs e)
        {
            if (selectedAsset != null)
            {
                const float MapScale = 10f;

                double targetX = e.X / MapScale;
                double targetY = e.Y / MapScale;

                selectedAsset.SetManualTarget(targetX, targetY);

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
            g.DrawString("Current Position", this.Font, Brushes.Black, 40, yPosition);

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



        private static string FindFolderRecursively(string folderName)
        {
            string currentDirectory = Directory.GetCurrentDirectory();

            while (currentDirectory != null)
            {
                string folderPath = Path.Combine(currentDirectory, folderName);
                if (Directory.Exists(folderPath))
                {
                    return folderPath;
                }

                currentDirectory = Directory.GetParent(currentDirectory)?.FullName;
            }

            throw new DirectoryNotFoundException($"Folder '{folderName}' not found in the current directory or any parent directories.");
        }

        private Image LoadFloorplanImage(string floorplanName)
        {
            try
            {
                string floorplansFolder = FindFolderRecursively("Floorplans");

                string imagePath = Path.Combine(floorplansFolder, $"{floorplanName}.png");

                if (File.Exists(imagePath))
                {
                    return Image.FromFile(imagePath);
                }
                else
                {
                    MessageBox.Show($"Image '{floorplanName}.png' not found in the 'Floorplans' folder.");
                }
            }
            catch (DirectoryNotFoundException ex)
            {
                MessageBox.Show(ex.Message);
            }

            return null;
        }

        private void SetFloorplanBackground(string floorplanName)
        {
            var floorplanImage = LoadFloorplanImage(floorplanName);
            if (floorplanImage != null)
            {
                MapPictureBox.BackgroundImage = floorplanImage;
                MapPictureBox.BackgroundImageLayout = ImageLayout.Stretch;
            }
            else
            {
                MessageBox.Show($"No image found for floorplan '{floorplanName}'.");
            }
        }


    }
}
