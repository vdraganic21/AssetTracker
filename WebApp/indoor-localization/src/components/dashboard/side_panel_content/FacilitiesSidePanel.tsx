import { SynDivider, SynInput } from "@synergy-design-system/react";
import FacilityCardContainer from "../../facilities-manager/FacilityCardContainer";
import { FacilityService } from "../../../services/FacilityService";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";

function FacilitiesSidePanel() {
	const facilities = FacilityService.GetAll();

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFacilities, setFilteredFacilities] = useState(facilities);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	useEffect(() => {
		let filtered = facilities.filter((facility) =>
			facility.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));

		setFilteredFacilities(filtered);
	}, [searchTerm]);
	return (
		<>
			<SynInput
				className="side-panel-search"
				placeholder="Search"
				onSynInput={handleSearch}
			/>
			<SynDivider />
			<div className="scrollable-list side-panel-facility-list">
				<FacilityCardContainer facilities={filteredFacilities} />
			</div>
		</>
	);
}

export default FacilitiesSidePanel;
