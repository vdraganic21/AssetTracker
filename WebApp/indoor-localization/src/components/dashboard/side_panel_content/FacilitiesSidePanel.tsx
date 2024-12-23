import { SynInput } from "@synergy-design-system/react";
import FacilityCardContainer from "../../facilities-manager/FacilityCardContainer";
import { FacilityService } from "../../../services/FacilityService";

function FacilitiesSidePanel() {
  const facilities = FacilityService.GetAll();

  return (
    <>
      <SynInput className="side-panel-asset-search" placeholder="Search" />
      <div className="scrollable-list">
        <FacilityCardContainer facilities={facilities} />
      </div>
    </>
  );
}

export default FacilitiesSidePanel;
