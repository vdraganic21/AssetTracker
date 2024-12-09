import FacilityCard from "./FacilityCard";
import Footer from "../Footer";
import "../Manager.css";

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
          {cards.map((card) => (
            <FacilityCard
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              facilityName={card.facilityName}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FacilitiesManager;
