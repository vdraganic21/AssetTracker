import Footer from "../common/Footer";
import "../common/Manager.css";
import {
	SynButton,
	SynDivider,
	SynInput,
	SynOption,
	SynSelect,
} from "@synergy-design-system/react";
import FacilityCardContainer from "./FacilityCardContainer";
import { useNavigate } from "react-router-dom";
import { FacilityService } from "../../services/FacilityService";
import { useEffect, useState } from "react";
import {
	SynChangeEvent,
	SynInputEvent,
} from "@synergy-design-system/react/components/checkbox.js";

const facilities = FacilityService.GetAll();

const sortOptions = [
	{ name: "Name - asc", value: "nameAsc" },
	{ name: "Name - desc", value: "nameDesc" },
];

function FacilitiesManager() {
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");
	const [sortedFacilities, setSortedFacilities] = useState(facilities);
	const [filterIndex, setFilterIndex] = useState(0);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);

		applyFilterAndSort(term, filterIndex);
	};

	const handleAddButtonClick = () => {
		navigate("/facilities/add");
	};

	const handleFilterChange = (event: SynChangeEvent) => {
		const selectedValue = (event.target as HTMLInputElement).value;

		const selectedIndex = sortOptions.findIndex(
			(option) => option.value === selectedValue
		);
		setFilterIndex(selectedIndex);

		applyFilterAndSort(searchTerm, selectedIndex);
	};

	const applyFilterAndSort = (term: string, sortIndex: number) => {
		let filteredFacilities = facilities.filter((facility) =>
			facility.name.toLowerCase().includes(term.toLowerCase())
		);

		switch (sortOptions[sortIndex]?.value) {
			case "nameAsc":
				filteredFacilities.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "nameDesc":
				filteredFacilities.sort((a, b) => b.name.localeCompare(a.name));
				break;
			default:
				break;
		}

		setSortedFacilities(filteredFacilities);
	};

	useEffect(() => {
		applyFilterAndSort(searchTerm, filterIndex);
	}, []);

	return (
		<>
			<div className="content content-width content-border">
				<div className="header-row">
					<span className="syn-heading--3x-large">Facilities</span>
					<div className="button-group">
						<SynButton
							variant="filled"
							className="syn-border-radius-medium"
							onClick={handleAddButtonClick}
						>
							Add
						</SynButton>
					</div>
				</div>
				<SynDivider className="content-divider" />
				<div className="search-row">
					<SynInput
						className="search-input"
						placeholder="Search"
						onSynInput={handleSearch}
					/>
					<p>Sort by:</p>
					<SynSelect
						value={sortOptions[filterIndex]?.value}
						className="sort-select"
						onSynChange={handleFilterChange}
					>
						{sortOptions.map((sortOption, index) => (
							<SynOption
								key={index}
								tabIndex={index}
								selected={index === filterIndex}
								value={sortOption.value}
							>
								{sortOption.name}
							</SynOption>
						))}
					</SynSelect>
				</div>
				<SynDivider className="content-divider" />
				<div className="scrollable-list">
					<FacilityCardContainer
						facilities={sortedFacilities}
					></FacilityCardContainer>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default FacilitiesManager;
