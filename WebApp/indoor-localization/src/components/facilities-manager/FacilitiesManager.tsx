import FacilityCard from "./FacilityCard";
import Footer from "../Footer";
import "../Manager.css";

const cards = [
  {
    imageSrc: "/floorMapDemo.png",
    imageAlt: "card image",
    facilityName: "Warehouse",
  },
];

const sortOptions = [
  { name: "Name - ascending", value: "nameAsc" },
  { name: "Name - descending", value: "nameDesc" },
];

function FacilitiesManager() {
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Facilities</span>
        <div className="card-container">
          <FacilityCard
            imageSrc={cards[0].imageSrc}
            imageAlt={cards[0].imageAlt}
            facilityName={cards[0].facilityName}
          ></FacilityCard>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FacilitiesManager;
