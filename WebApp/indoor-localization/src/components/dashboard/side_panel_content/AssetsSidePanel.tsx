import { SynInput } from "@synergy-design-system/react";
import "./AssetsSidePanel.css";
import AssetsSidePaneList from "./AssetsSidePanelList";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { useEffect, useState } from "react";
import SelectedFacilityService from "../../../services/SelectedFacilityService";

function AssetsSidePanel() {
	const assets =
		SelectedFacilityService.getSelectedFacility()?.GetAssets() || [];

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredAssets, setFilteredAssets] = useState(assets);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	useEffect(() => {
		if (!assets) {
			setFilteredAssets([]);
			return;
		}

		let filtered = assets.filter((asset) =>
			asset.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredAssets(filtered);
	}, [searchTerm]);

	return (
		<>
			<SynInput
				className="side-panel-search"
				placeholder="Search"
				value={searchTerm}
				onSynInput={handleSearch}
			/>
			<div className="scrollable-list">
				<AssetsSidePaneList assets={filteredAssets} />
			</div>
		</>
	);
}

export default AssetsSidePanel;
