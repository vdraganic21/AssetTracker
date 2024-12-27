namespace SimulatorControlUI
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            MapPictureBox = new PictureBox();
            AssetSelectorComboBox = new ComboBox();
            RefreshButton = new Button();
            backgroundWorker1 = new System.ComponentModel.BackgroundWorker();
            LegendPanel = new Panel();
            FloorplanSelectorComboBox = new ComboBox();
            ((System.ComponentModel.ISupportInitialize)MapPictureBox).BeginInit();
            SuspendLayout();
            // 
            // MapPictureBox
            // 
            MapPictureBox.BackgroundImage = (Image)resources.GetObject("MapPictureBox.BackgroundImage");
            MapPictureBox.BackgroundImageLayout = ImageLayout.Stretch;
            MapPictureBox.Location = new Point(12, 12);
            MapPictureBox.Name = "MapPictureBox";
            MapPictureBox.Size = new Size(687, 541);
            MapPictureBox.SizeMode = PictureBoxSizeMode.StretchImage;
            MapPictureBox.TabIndex = 0;
            MapPictureBox.TabStop = false;
            MapPictureBox.MouseClick += MapPictureBox_MouseClick;
            // 
            // AssetSelectorComboBox
            // 
            AssetSelectorComboBox.FormattingEnabled = true;
            AssetSelectorComboBox.Location = new Point(717, 12);
            AssetSelectorComboBox.Name = "AssetSelectorComboBox";
            AssetSelectorComboBox.Size = new Size(151, 28);
            AssetSelectorComboBox.TabIndex = 1;
            AssetSelectorComboBox.SelectedIndexChanged += AssetSelectorComboBox_SelectedIndexChanged;
            // 
            // RefreshButton
            // 
            RefreshButton.Location = new Point(874, 12);
            RefreshButton.Name = "RefreshButton";
            RefreshButton.Size = new Size(94, 29);
            RefreshButton.TabIndex = 2;
            RefreshButton.Text = "Refresh";
            RefreshButton.UseVisualStyleBackColor = true;
            RefreshButton.Click += RefreshButton_Click;
            // 
            // LegendPanel
            // 
            LegendPanel.Location = new Point(717, 95);
            LegendPanel.Name = "LegendPanel";
            LegendPanel.Size = new Size(297, 286);
            LegendPanel.TabIndex = 3;
            LegendPanel.Paint += LegendPanel_Paint;
            // 
            // FloorplanSelectorComboBox
            // 
            FloorplanSelectorComboBox.FormattingEnabled = true;
            FloorplanSelectorComboBox.Location = new Point(717, 46);
            FloorplanSelectorComboBox.Name = "FloorplanSelectorComboBox";
            FloorplanSelectorComboBox.Size = new Size(151, 28);
            FloorplanSelectorComboBox.TabIndex = 4;
            FloorplanSelectorComboBox.SelectedIndexChanged += FloorplanSelectorComboBox_SelectedIndexChanged;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1026, 563);
            Controls.Add(FloorplanSelectorComboBox);
            Controls.Add(LegendPanel);
            Controls.Add(RefreshButton);
            Controls.Add(AssetSelectorComboBox);
            Controls.Add(MapPictureBox);
            Name = "Form1";
            Text = "Form1";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)MapPictureBox).EndInit();
            ResumeLayout(false);
        }

        #endregion

        private PictureBox MapPictureBox;
        private ComboBox AssetSelectorComboBox;
        private Button RefreshButton;
        private System.ComponentModel.BackgroundWorker backgroundWorker1;
        private Panel LegendPanel;
        private ComboBox FloorplanSelectorComboBox;
    }
}
