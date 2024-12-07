import "./DashboardSidePanel.css";
import SidePanelContentContainer from "./SidePanelContentContainer";
import SidePanelItem from "./SidePanelItem";

function DashboardSidePanel() {
  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        <SidePanelItem imageSrc={"/logo192.png"} name={"Assets"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Facilities"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Zones"} />
      </div>
      <SidePanelContentContainer></SidePanelContentContainer>
    </div>
  );
}

export default DashboardSidePanel;
