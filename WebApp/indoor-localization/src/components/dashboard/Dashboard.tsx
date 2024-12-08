import "./Dashboard.css";
import DashboardSidePanel from "./DashboardSidePanel";
import FloorMapDisplay from "./FloorMapDisplay";

function Dashboard() {
  return (
    <div className="content">
      <DashboardSidePanel></DashboardSidePanel>
      <FloorMapDisplay></FloorMapDisplay>
    </div>
  );
}

export default Dashboard;
