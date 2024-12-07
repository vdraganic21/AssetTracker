import { useState } from "react";
import "./DashboardSidePanel.css";
import SidePanelContentContainer from "./SidePanelContentContainer";
import SidePanelItem from "./SidePanelItem";
import AssetsSidePanel from "./side_panel_content/AssetsSidePanel";
import FacilitiesSidePanel from "./side_panel_content/FacilitiesSidePanel";
import ZonesSidePanel from "./side_panel_content/ZonesSidePanel";

function DashboardSidePanel() {
  const [isSidePanelOpen = false, setIsSidePanelOpen] = useState<
    boolean | null
  >();
  const [selectedItem, setSelectedItem] = useState<string | null>("Assets");

  const [sidePanelContent, setSidePanelContent] =
    useState<JSX.Element | null>();

  const handleItemClick = (
    newSelectedItem: string,
    selectedContent: JSX.Element
  ) => {
    setSidePanelContent(selectedContent);
    if (newSelectedItem == selectedItem) {
      setIsSidePanelOpen(!isSidePanelOpen);
      return;
    }

    setSelectedItem(newSelectedItem);
    setIsSidePanelOpen(true);
  };

  const panelItems = [
    { name: "Assets", imageSrc: "/logo192.png", content: AssetsSidePanel() },
    {
      name: "Facilities",
      imageSrc: "/logo192.png",
      content: FacilitiesSidePanel(),
    },
    { name: "Zones", imageSrc: "/logo192.png", content: ZonesSidePanel() },
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
            onClick={() => handleItemClick(item.name, item.content)}
          />
        ))}
      </div>
      {isSidePanelOpen && (
        <SidePanelContentContainer>
          {sidePanelContent}
        </SidePanelContentContainer>
      )}
    </div>
  );
}

export default DashboardSidePanel;
