import { SynDivider, SynInput } from "@synergy-design-system/react";
import FacilityCardContainer from "../../facilities-manager/FacilityCardContainer";
import { FacilityService } from "../../../services/FacilityService";
import { useEffect, useState } from "react";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { Facility } from "../../../entities/Facility";
import Spinner from "../../common/Spinner";

function FacilitiesSidePanel() {
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredFacilities, setFilteredFacilities] = useState<Facility[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
	};

	const fetchFacilities = async () => {
		setIsLoading(true);
		const fetchedFacilities = await FacilityService.GetAll();
		setFacilities(fetchedFacilities);
		setIsLoading(false);
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
			{isLoading ? (
				<Spinner text="Loading facilities." />
			) : (
				<div className="scrollable-list side-panel-facility-list">
					<FacilityCardContainer facilities={filteredFacilities} />
				</div>
			)}
		</>
	);
}

export default FacilitiesSidePanel;
