import { SynDivider } from "@synergy-design-system/react";
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
					<p className="side-panel-item-list" key={index}>
						{asset.name}
					</p>
					<SynDivider />
				</>
			))}
		</>
	);
}

export default AssetsSidePanelList;
