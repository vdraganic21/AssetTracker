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
import { useNavigate } from "react-router-dom";
import { FacilityService } from "../../services/FacilityService";

const facilities = FacilityService.GetAll();

const sortOptions = [
  { name: "Name - asc", value: "nameAsc" },
  { name: "Name - desc", value: "nameDesc" },
];

function FacilitiesManager() {
  const navigate = useNavigate();

  const handleAddButtonClick = () => {
    navigate("/facilities/add");
  };

  return (
    <>
      <div className="content content-border">
        <div className="header-row">
          <span className="syn-heading--3x-large">Facilities</span>
          <div className="button-group">
            <SynButton variant="outline">Delete</SynButton>
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
        <div className="scrollable-list">
          <FacilityCardContainer facilities={facilities}></FacilityCardContainer>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FacilitiesManager;
