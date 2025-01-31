import { SynDivider, SynIcon } from "@synergy-design-system/react";
import { Asset } from "../../../entities/Asset";
import "./SidePanelList.css";

function AssetsSidePanelList({ assets }: { assets: Asset[] }) {
	if (assets.length == 0)
		return (
			<div>
				<p className="no-items-message">No assets found.</p>
			</div>
		);

	return (
		<>
			<SynDivider />
			{assets.map((asset, index) => (
				<>
					<div className="side-panel-item-list">
						<p key={index}>{asset.name}</p>
						<SynIcon library="fa" name="far-eye"></SynIcon>
					</div>

					<SynDivider />
				</>
			))}
		</>
	);
}

export default AssetsSidePanelList;
