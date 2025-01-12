import { SynInput } from "@synergy-design-system/react";
import { ZoneService } from "../../../services/ZoneService";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import ZonesSidePanelList from "./ZonesSidePanelList";

function ZonesSidePanel() {
	const zones = ZoneService.GetAll();

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredZones, setFilteredZones] = useState(zones);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	useEffect(() => {
		let filtered = zones.filter((zone) =>
			zone.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredZones(filtered);
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
				<ZonesSidePanelList zones={filteredZones} />
			</div>
		</>
	);
}

export default ZonesSidePanel;
