import "./Dashboard.css";
import SidePanelItem from "./SidePanelItem";

function Dashboard() {
  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        <SidePanelItem imageSrc={"/logo192.png"} name={"Assets"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Facilities"} />
        <SidePanelItem imageSrc={"/logo192.png"} name={"Zones"} />
      </div>
      <div className="side-panel-content side-panel-border">content</div>
    </div>
  );
}

export default Dashboard;
