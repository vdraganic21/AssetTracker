import "./DashboardSidePanel.css";
import AssetsSidePanel from "./side_panel_content/AssetsSidePanel";
import SidePanelItem from "./SidePanelItem";

function DashboardSidePanel() {
  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        <SidePanelItem imageSrc={"/logo192.png"} name={"Assets"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Facilities"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Zones"} />
      </div>
      <div className="side-panel-content side-panel-border">
        <AssetsSidePanel></AssetsSidePanel>
      </div>
    </div>
  );
}

export default DashboardSidePanel;
