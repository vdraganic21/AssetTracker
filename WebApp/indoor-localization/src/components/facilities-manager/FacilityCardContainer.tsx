import { Facility } from "../../entities/Facility";
import FacilityCard from "./FacilityCard";
import "./FacilityCardContainer.css";

function FacilityCardContainer({ facilities }: { facilities: Facility[] }) {
  return (
    <div className="facility-card-container">
      {facilities.map((facility) => (
        <FacilityCard
          imageSrc={facility.imageBase64}
          imageAlt={facility.name}
          facilityName={facility.name}
        />
      ))}
    </div>
  );
}

export default FacilityCardContainer;
