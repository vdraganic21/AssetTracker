import { useState } from "react";
import "./DashboardSidePanel.css";
import SidePanelContentContainer from "./SidePanelContentContainer";
import SidePanelItem from "./SidePanelItem";

function DashboardSidePanel() {
  let [isSidePanelOpen = false, setIsSidePanelOpen] = useState<
    boolean | null
  >();
  const [selectedItem, setSelectedItem] = useState<string | null>("Assets");

  const handleItemClick = (name: string) => {
    if (name == selectedItem) {
      setIsSidePanelOpen(!isSidePanelOpen);
      return;
    }

    setSelectedItem(name);
    setIsSidePanelOpen(true);
  };

  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        <SidePanelItem
          imageSrc={"/logo192.png"}
          name={"Assets"}
          selected={selectedItem === "Assets"}
          onClick={() => handleItemClick("Assets")}
        />
        <SidePanelItem
          imageSrc={"/logo192.png"}
          name={"Facilities"}
          selected={selectedItem === "Facilities"}
          onClick={() => handleItemClick("Facilities")}
        />
        <SidePanelItem
          imageSrc={"/logo192.png"}
          name={"Zones"}
          selected={selectedItem === "Zones"}
          onClick={() => handleItemClick("Zones")}
        />
      </div>
      {isSidePanelOpen && <SidePanelContentContainer />}
    </div>
  );
}

export default DashboardSidePanel;
