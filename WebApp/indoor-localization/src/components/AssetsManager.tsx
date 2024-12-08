import {
  SynButton,
  SynCheckbox,
  SynDivider,
  SynInput,
  SynOption,
  SynSelect,
} from "@synergy-design-system/react";
import Footer from "./Footer";
import "./Manager.css";

const assets = [
  {
    id: 1,
    name: "Forklift",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 23,
    y: 32,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 2,
    name: "Forklift 2",
    floorMap: { id: 2, name: "Warehouse 1", image: "" },
    x: 45,
    y: 78,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "-",
  },
  {
    id: 3,
    name: "Robot",
    floorMap: { id: 3, name: "Shipping Dock", image: "" },
    x: 12,
    y: 55,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "Danger zone",
  },
  {
    id: 4,
    name: "RoboDog",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 90,
    y: 20,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 5,
    name: "Pallet 357",
    floorMap: { id: 4, name: "Assembly Line", image: "" },
    x: 65,
    y: 43,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "Danger zone",
  },
  {
    id: 1,
    name: "Forklift",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 23,
    y: 32,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 2,
    name: "Forklift 2",
    floorMap: { id: 2, name: "Warehouse 1", image: "" },
    x: 45,
    y: 78,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "-",
  },
  {
    id: 3,
    name: "Robot",
    floorMap: { id: 3, name: "Shipping Dock", image: "" },
    x: 12,
    y: 55,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "Danger zone",
  },
  {
    id: 4,
    name: "RoboDog",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 90,
    y: 20,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 5,
    name: "Pallet 357",
    floorMap: { id: 4, name: "Assembly Line", image: "" },
    x: 65,
    y: 43,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "Danger zone",
  },
  {
    id: 1,
    name: "Forklift",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 23,
    y: 32,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 2,
    name: "Forklift 2",
    floorMap: { id: 2, name: "Warehouse 1", image: "" },
    x: 45,
    y: 78,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "-",
  },
  {
    id: 3,
    name: "Robot",
    floorMap: { id: 3, name: "Shipping Dock", image: "" },
    x: 12,
    y: 55,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "Danger zone",
  },
  {
    id: 4,
    name: "RoboDog",
    floorMap: { id: 1, name: "Warehouse 2", image: "" },
    x: 90,
    y: 20,
    lastSync: new Date().toDateString(),
    active: true,
    zone: "-",
  },
  {
    id: 5,
    name: "Pallet 357",
    floorMap: { id: 4, name: "Assembly Line", image: "" },
    x: 65,
    y: 43,
    lastSync: new Date().toDateString(),
    active: false,
    zone: "Danger zone",
  },
];

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
        <table className="syn-table--default">
          <thead>
            <tr>
              <th className="syn-table-cell--shadow-bottom shadow-cell">
                Name
              </th>
              <th className="syn-table-cell--shadow-bottom shadow-cell">
                Facility
              </th>
              <th className="syn-table-cell--shadow-bottom shadow-cell">
                Zone
              </th>
              <th className="syn-table-cell--shadow-bottom shadow-cell"></th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr className="row-bottom-border">
                <td>{asset.name}</td>
                <td>{asset.floorMap.name}</td>
                <td>{asset.zone}</td>
                <td>
                  <SynCheckbox />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer></Footer>
    </>
  );
}

export default AssetsManager;
