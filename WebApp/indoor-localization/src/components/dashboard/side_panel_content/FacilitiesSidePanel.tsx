import { SynDivider, SynInput } from "@synergy-design-system/react";
import FacilityCardContainer from "../../facilities-manager/FacilityCardContainer";
import { FacilityService } from "../../../services/FacilityService";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { Facility } from "../../../entities/Facility";

function FacilitiesSidePanel() {
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	const fetchFacilities = async () => {
		const fetchedFacilities = await FacilityService.GetAll();
		setFacilities(fetchedFacilities);
	};

	useEffect(() => {
		fetchFacilities();
	}, []);

	useEffect(() => {
		let filtered = facilities.filter((facility) =>
			facility.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredFacilities(filtered);
	}, [searchTerm, facilities]);

	return (
		<>
			<SynInput
				className="side-panel-search"
				placeholder="Search"
				onSynInput={handleSearch}
			/>
			<SynDivider />
			<div className="scrollable-list">
				<FacilityCardContainer facilities={filteredFacilities} />
			</div>
		</>
	);
}

export default FacilitiesSidePanel;
