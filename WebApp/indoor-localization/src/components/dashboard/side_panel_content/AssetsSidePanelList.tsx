import { SynDivider } from "@synergy-design-system/react";
import { Asset } from "../../../entities/Asset";
import "./AssetsSidePanelList.css";

function AssetsSidePaneList({ assets }: { assets: Asset[] }) {
  return (
    <>
      <SynDivider />
      {assets.map((asset, index) => (
        <>
          <p className="side-panel-asset-list" key={index}>
            {asset.name}
          </p>
          <SynDivider />
        </>
      ))}
    </>
  );
}

export default AssetsSidePaneList;
