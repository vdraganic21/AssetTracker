import { SynInput } from "@synergy-design-system/react";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import ZonesSidePanelList from "./ZonesSidePanelList";
import SelectedFacilityService from "../../../services/SelectedFacilityService";
import { Zone } from "../../../entities/Zone";

function ZonesSidePanel() {
	const [zones, setZones] = useState<Zone[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredZones, setFilteredZones] = useState<Zone[]>([]);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	const fetchZones = async () => {
		const facility = await SelectedFacilityService.getSelectedFacility();
		if (facility) {
			const fetchedZones = facility.containedZones;
			setZones(fetchedZones);
		}
	};

	useEffect(() => {
		fetchZones();
	}, []);

	useEffect(() => {
		let filtered = zones.filter((zone) =>
			zone.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredZones(filtered);
	}, [searchTerm, zones]);

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
