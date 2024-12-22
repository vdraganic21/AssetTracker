import { SynInput } from "@synergy-design-system/react";
import "./AssetsSidePanel.css";
import AssetsSidePaneList from "./AssetsSidePanelList";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { useEffect, useState } from "react";
import { AssetService } from "../../../services/AssetService";

function AssetsSidePanel() {
  const assets = AssetService.GetAll();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssets, setFilteredAssets] = useState(assets);

  const handleSearch = (event: SynInputEvent) => {
    const term = (event.target as HTMLInputElement).value;
    setSearchTerm(term);
  };

  useEffect(() => {
    let filtered = assets.filter((asset) =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

    setFilteredAssets(filtered);
  }, [searchTerm]);

  return (
    <div>
      <SynInput
        className="side-panel-asset-search"
        placeholder="Search"
        value={searchTerm}
        onSynInput={handleSearch}
      />
      <AssetsSidePaneList assets={filteredAssets} />
    </div>
  );
}

export default AssetsSidePanel;
