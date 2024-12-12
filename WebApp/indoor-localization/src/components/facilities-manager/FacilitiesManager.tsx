import Footer from "../Footer";
import "../Manager.css";
import {
  SynButton,
  SynDivider,
  SynInput,
  SynOption,
  SynSelect,
} from "@synergy-design-system/react";
import FacilityCardContainer from "./FacilityCardContainer";

const cards = [
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 1",
  },
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 2",
  },
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 3",
  },
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 4",
  },
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 5",
  },
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse 5",
  },
];

const sortOptions = [
  { name: "Name - asc", value: "nameAsc" },
  { name: "Name - desc", value: "nameDesc" },
];

function FacilitiesManager() {
  return (
    <>
      <div className="content content-border">
        <div className="header-row">
          <span className="syn-heading--3x-large">Facilities</span>
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
        <FacilityCardContainer cards={cards}></FacilityCardContainer>
      </div>
      <Footer />
    </>
  );
}

export default FacilitiesManager;
