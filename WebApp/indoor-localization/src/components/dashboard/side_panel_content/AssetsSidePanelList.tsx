import { useState } from "react";
import { SynDivider, SynIcon } from "@synergy-design-system/react";
import { Asset } from "../../../entities/Asset";
import "./SidePanelList.css";
import HiddenAssetsService from "../../../services/HiddenAssetsService";

function AssetsSidePanelList({ assets }: { assets: Asset[] }) {
	const [, setHiddenAssets] = useState<number[]>(
		HiddenAssetsService.GetHiddenAssets()
	);

	const handleToggleAsset = (assetId: number) => {
		HiddenAssetsService.ToggleAsset(assetId);
		setHiddenAssets(HiddenAssetsService.GetHiddenAssets());
	};

	if (assets.length === 0) {
		return (
			<div>
				<p className="no-items-message">No assets found.</p>
			</div>
		);
	}

	return (
		<>
			<SynDivider />
			{assets.map((asset, index) => (
				<div key={index} className="side-panel-item-list">
					<p className="unselectable">{asset.name}</p>
					<SynIcon
						library="fa"
						name={
							HiddenAssetsService.IsAssetHidden(asset.id)
								? "far-eye-slash"
								: "far-eye"
						}
						onClick={() => handleToggleAsset(asset.id)}
					/>
				</div>
			))}
			<SynDivider />
		</>
	);
}

export default AssetsSidePanelList;
