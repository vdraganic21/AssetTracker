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
            // Subscribe to the AssetsLoaded event before starting the simulation
            ProgramSimulator.AssetsLoaded += OnAssetsLoaded;

            // Run ProgramSimulator.Main asynchronously using Task.Run to avoid blocking the UI thread
            Task.Run(async () =>
            {
                await ProgramSimulator.Main(new string[] { });
            });
        }

        private void OnAssetsLoaded()
        {
            // This method is called when assets are loaded
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
            var simulatorInstance = ProgramSimulator.simulator;  // Use the simulator instance from ProgramSimulator

            if (simulatorInstance == null || simulatorInstance.Assets == null || simulatorInstance.Assets.Count == 0)
            {
                MessageBox.Show("Simulator or assets are not properly initialized.");
                return;
            }

            // Populate the combo box with assets
            AssetSelectorComboBox.Items.Clear();
            foreach (var asset in simulatorInstance.Assets)
            {
                AssetSelectorComboBox.Items.Add($"Asset {asset.AssetId}");
            }

            // Set the default selected asset if there are assets
            if (simulatorInstance.Assets.Count > 0)
            {
                AssetSelectorComboBox.SelectedIndex = 0;
                selectedAsset = simulatorInstance.Assets[0];
            }
        }

        private void AssetSelectorComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            var selectedIndex = AssetSelectorComboBox.SelectedIndex;
            var simulatorInstance = ProgramSimulator.simulator;  // Use the simulator instance from ProgramSimulator
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
            var simulatorInstance = ProgramSimulator.simulator;  // Use the simulator instance from ProgramSimulator

            if (simulatorInstance == null || simulatorInstance.Assets == null)
            {
                return;
            }

            const float MapScale = 10f;
            const float AssetRadius = 5f;

            foreach (var asset in simulatorInstance.Assets)
            {
                g.FillEllipse(Brushes.Blue,
                    (float)(asset.X * MapScale - AssetRadius),
                    (float)(asset.Y * MapScale - AssetRadius),
                    AssetRadius * 2,
                    AssetRadius * 2);

                g.DrawString(asset.AssetId.ToString(), this.Font, Brushes.Black,
                    (float)(asset.X * MapScale),
                    (float)(asset.Y * MapScale));
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
    }
}
