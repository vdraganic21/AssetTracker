import { SynInput } from "@synergy-design-system/react";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import ZonesSidePanelList from "./ZonesSidePanelList";
import SelectedFacilityService from "../../../services/SelectedFacilityService";
import { Zone } from "../../../entities/Zone";
import Spinner from "../../common/Spinner";

function ZonesSidePanel() {
	const [zones, setZones] = useState<Zone[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredZones, setFilteredZones] = useState<Zone[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	const fetchZones = async () => {
		setIsLoading(true);
		const facility = await SelectedFacilityService.getSelectedFacility();
		if (facility) {
			const fetchedZones = facility.containedZones;
			setZones(fetchedZones);
		}
		setIsLoading(false);
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
			{isLoading ? (
				<Spinner text="Loading assets." />
			) : (
				<div className="scrollable-list">
					<ZonesSidePanelList zones={filteredZones} />
				</div>
			)}
		</>
	);
}

export default ZonesSidePanel;
