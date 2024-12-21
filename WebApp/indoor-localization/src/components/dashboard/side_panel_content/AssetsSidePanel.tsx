import { SynDivider, SynInput } from "@synergy-design-system/react";
import { Asset } from "../../../entities/Asset";
import { Point } from "../../../entities/Point";
import "./AssetsSidePanel.css";

function AssetsSidePanel() {
  //const assets = AssetService.GetAll();
  const assets = [
    new Asset(1, "Asset1", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset2", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset3", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset4", 1, new Point(1, 1), new Date(), true, []),
    new Asset(1, "Asset5", 1, new Point(1, 1), new Date(), true, []),
  ];

  return (
    <div>
      <SynInput className="side-panel-asset-search" placeholder="Search" />
      <SynDivider />
      {assets.map((asset, index) => (
        <>
          <p className="side-panel-asset-list" key={index}>
            {asset.name}
          </p>
          <SynDivider />
        </>
      ))}
    </div>
  );
}

export default AssetsSidePanel;
