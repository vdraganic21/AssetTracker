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
import { Facility } from "../../entities/Facility";
import Spinner from "../common/Spinner";

const sortOptions = [
	{ name: "Name - asc", value: "nameAsc" },
	{ name: "Name - desc", value: "nameDesc" },
];

function FacilitiesManager() {
	const navigate = useNavigate();

	const [searchTerm, setSearchTerm] = useState("");
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [sortedFacilities, setSortedFacilities] = useState<Facility[]>([]);
	const [filterIndex, setFilterIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchFacilities = async () => {
			setIsLoading(true);
			const fetchedFacilities = await FacilityService.GetAll();
			setFacilities(fetchedFacilities);
			applyFilterAndSort(fetchedFacilities, searchTerm, filterIndex);
			setIsLoading(false);
		};
		fetchFacilities();
	}, []);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
		applyFilterAndSort(facilities, term, filterIndex);
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
		applyFilterAndSort(facilities, searchTerm, selectedIndex);
	};

	const applyFilterAndSort = (
		facilitiesList: Facility[],
		term: string,
		sortIndex: number
	) => {
		let filteredFacilities = facilitiesList.filter((facility) =>
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

	return (
		<>
			<div className="content content-width content-border content-margin">
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
				{isLoading && <Spinner text="Loading facilities." />}
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
