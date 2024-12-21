import { SynInput } from "@synergy-design-system/react";
import { Asset } from "../../../entities/Asset";
import { Point } from "../../../entities/Point";
import "./AssetsSidePanel.css";
import AssetsSidePaneList from "./AssetsSidePanelList";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { useEffect, useState } from "react";

function AssetsSidePanel() {
  //const assets = AssetService.GetAll();
  const assets = [
    new Asset(1, "Asset1", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset2", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset3", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset4", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset5", 1, new Point(1, 1), new Date(), true, []),
  ];

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
