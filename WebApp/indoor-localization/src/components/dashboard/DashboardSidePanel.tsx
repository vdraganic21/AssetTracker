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

  const panelItems = [
    { name: "Assets", imageSrc: "/logo192.png" },
    { name: "Facilities", imageSrc: "/logo192.png" },
    { name: "Zones", imageSrc: "/logo192.png" },
  ];

  return (
    <div className="side-panel-container">
      <div className="side-panel-bar side-panel-border">
        {panelItems.map((item) => (
          <SidePanelItem
            key={item.name}
            imageSrc={item.imageSrc}
            name={item.name}
            selected={selectedItem === item.name}
            onClick={() => handleItemClick(item.name)}
          />
        ))}
      </div>
      {isSidePanelOpen && <SidePanelContentContainer />}
    </div>
  );
}

export default DashboardSidePanel;
