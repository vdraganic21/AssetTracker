import "./DashboardSidePanel.css";
import SidePanel from "./side_panel_content/SidePanel";
import SidePanelItem from "./SidePanelItem";

function DashboardSidePanel() {
  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        <SidePanelItem imageSrc={"/logo192.png"} name={"Assets"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Facilities"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Zones"} />
      </div>
      <SidePanel></SidePanel>
    </div>
  );
}

export default DashboardSidePanel;
