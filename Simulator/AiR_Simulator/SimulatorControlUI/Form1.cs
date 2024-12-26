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
            if (ProgramSimulator.simulator != null && ProgramSimulator.simulator.Assets != null && ProgramSimulator.simulator.Assets.Count > 0)
            {
                PopulateAssetList();
            }
            else
            {
                MessageBox.Show("Failed to load assets. Check simulator initialization.");
            }
        }

        private void PopulateAssetList()
        {
            var simulatorInstance = ProgramSimulator.simulator;

            if (simulatorInstance == null || simulatorInstance.Assets == null || simulatorInstance.Assets.Count == 0)
            {
                MessageBox.Show("Simulator or assets are not properly initialized.");
                return;
            }

            AssetSelectorComboBox.Items.Clear();
            foreach (var asset in simulatorInstance.Assets)
            {
                AssetSelectorComboBox.Items.Add($"Asset {asset.AssetId}");
            }

            if (simulatorInstance.Assets.Count > 0)
            {
                AssetSelectorComboBox.SelectedIndex = 0;
                selectedAsset = simulatorInstance.Assets[0];
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
            DrawAssets(e.Graphics);
        }

        private void DrawAssets(Graphics g)
        {
            var simulatorInstance = ProgramSimulator.simulator;

            if (simulatorInstance == null || simulatorInstance.Assets == null)
            {
                return;
            }

            const float MapScale = 10f;
            const float AssetRadius = 5f;
            const float TargetRadius = 3f;

            foreach (var asset in simulatorInstance.Assets)
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

                // Convert click position to simulator coordinates
                double targetX = e.X / MapScale;
                double targetY = e.Y / MapScale;

                // Set manual control for the selected asset
                selectedAsset.SetManualTarget(targetX, targetY);

                // Refresh map
                MapPictureBox.Invalidate();
            }
        }

        private void StartAutoRefresh()
        {
            // Initialize the timer
            refreshTimer = new System.Windows.Forms.Timer();
            refreshTimer.Interval = 100; // Set interval in milliseconds (100ms = 10 refreshes per second)
            refreshTimer.Tick += RefreshTimer_Tick; // Subscribe to the Tick event
            refreshTimer.Start(); // Start the timer
        }

        private void RefreshTimer_Tick(object sender, EventArgs e)
        {
            // Trigger a repaint of the map
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

    }
}
