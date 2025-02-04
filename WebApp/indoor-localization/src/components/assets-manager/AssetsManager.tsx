import {
	SynButton,
	SynDivider,
	SynInput,
	SynOption,
	SynSelect,
} from "@synergy-design-system/react";
import Footer from "../common/Footer";
import "../common/Manager.css";
import { AssetService } from "../../services/AssetService";
import AssetsTable from "./AssetsTable";
import { useEffect, useState } from "react";
import {
	SynChangeEvent,
	SynInputEvent,
} from "@synergy-design-system/react/components/checkbox.js";
import { useNavigate } from "react-router-dom";
import Spinner from "../common/Spinner";

const sortOptions = [
	{ name: "Name - asc", value: "nameAsc" },
	{ name: "Name - desc", value: "nameDesc" },
	{ name: "Facility - asc", value: "facilityAsc" },
	{ name: "Facility - desc", value: "facilityDesc" },
	{ name: "Zone - asc", value: "zoneAsc" },
	{ name: "Zone - desc", value: "zoneDesc" },
];

function AssetsManager() {
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const [assets, setAssets] = useState<any[]>([]);
	const [sortedAssets, setSortedAssets] = useState<any[]>([]);
	const [filterIndex, setFilterIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchAssets = async () => {
			setIsLoading(true);
			const fetchedAssets = await AssetService.GetAll();

			const enrichedAssets = await Promise.all(
				fetchedAssets.map(async (asset) => ({
					...asset,
					facilityName:
						(await AssetService.GetAssetParentFacility(asset))?.name ?? "-",
					zoneName:
						(await AssetService.GetAssetCurrentZones(asset))[0]?.name ?? "-",
				}))
			);

			setAssets(enrichedAssets);
			setSortedAssets(enrichedAssets);
			setIsLoading(false);
		};

		fetchAssets();
	}, []);

	const handleSearch = (event: SynInputEvent) => {
		const term = (event.target as HTMLInputElement).value;
		setSearchTerm(term);
		applyFilterAndSort(term, filterIndex);
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
		let filteredAssets = assets.filter((asset) =>
			asset.name.toLowerCase().includes(term.toLowerCase())
		);

		switch (sortOptions[sortIndex]?.value) {
			case "nameAsc":
				filteredAssets.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "nameDesc":
				filteredAssets.sort((a, b) => b.name.localeCompare(a.name));
				break;
			case "facilityAsc":
				filteredAssets.sort((a, b) =>
					a.facilityName.localeCompare(b.facilityName)
				);
				break;
			case "facilityDesc":
				filteredAssets.sort((a, b) =>
					b.facilityName.localeCompare(a.facilityName)
				);
				break;
			case "zoneAsc":
				filteredAssets.sort((a, b) => a.zoneName.localeCompare(b.zoneName));
				break;
			case "zoneDesc":
				filteredAssets.sort((a, b) => b.zoneName.localeCompare(a.zoneName));
				break;
			default:
				break;
		}

		setSortedAssets(filteredAssets);
	};

	return (
		<>
			<div className="content content-width content-border content-margin">
				<div className="header-row">
					<span className="syn-heading--3x-large">Assets</span>
					<div className="button-group">
						<SynButton
							variant="filled"
							className="syn-border-radius-medium"
							onClick={() => navigate("/assets/add")}
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
						value={searchTerm}
						onSynInput={handleSearch}
					/>
					<p>Sort by:</p>
					<SynSelect
						value={sortOptions[filterIndex]?.value}
						onSynChange={handleFilterChange}
						className="sort-select"
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
				{isLoading && <Spinner text="Loading assets." />}
				{!isLoading && (
					<div className="scrollable-list">
						<AssetsTable assets={sortedAssets} />
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}

export default AssetsManager;
