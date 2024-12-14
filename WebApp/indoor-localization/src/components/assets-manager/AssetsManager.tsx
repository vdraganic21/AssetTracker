import {
  SynButton,
  SynDivider,
  SynInput,
  SynOption,
  SynSelect,
} from "@synergy-design-system/react";
import Footer from "../Footer";
import "../Manager.css";
import { AssetService } from "../../services/AssetService";
import AssetsTable from "./AssetsTable";

const assets = AssetService.GetAll();

const sortOptions = [
  { name: "Name - asc", value: "nameAsc" },
  { name: "Name - desc", value: "nameDesc" },
  { name: "Facility - asc", value: "facilityAsc" },
  { name: "Facility - desc", value: "facilityDesc" },
  { name: "Zone - asc", value: "zoneAsc" },
  { name: "Zone - desc", value: "zoneDesc" },
];

function AssetsManager() {
  return (
    <>
      <div className="content content-border">
        <div className="header-row">
          <span className="syn-heading--3x-large">Assets</span>
          <div className="button-group">
            <SynButton variant="outline">Delete</SynButton>
            <SynButton variant="filled" className="syn-border-radius-medium">
              Add
            </SynButton>
          </div>
        </div>
        <SynDivider className="content-divider" />
        <div className="search-row">
          <SynInput className="search-input" placeholder="Search" />
          <p>Sort by:</p>
          <SynSelect value={sortOptions[0]?.value} className="sort-select">
            {sortOptions.map((sortOption, index) => (
              <SynOption
                tabIndex={index}
                selected={0 == index}
                value={sortOption.value}
              >
                {sortOption.name}
              </SynOption>
            ))}
          </SynSelect>
        </div>
        <SynDivider className="content-divider" />
        <AssetsTable assets={assets}></AssetsTable>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AssetsManager;
