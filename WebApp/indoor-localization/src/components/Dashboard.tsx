import "./Dashboard.css";
import SidePanelItem from "./SidePanelItem";

function Dashboard() {
  return (
    <>
      <div className="content">
        <div className="side-panel side-panel-border">
          <SidePanelItem imageSrc={"/logo192.png"} name={"Assets"} />
          <SidePanelItem imageSrc={"/logo192.png"} name={"Facilities"} />
          <SidePanelItem imageSrc={"/logo192.png"} name={"Zones"} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
