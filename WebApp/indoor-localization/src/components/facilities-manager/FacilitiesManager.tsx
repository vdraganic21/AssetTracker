import Footer from "../Footer";
import "../Manager.css";

const facilities = [
  {
    id: 1,
    name: "Facility",
    location: "Location",
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
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
          <div className="card">
            <img
              src="/floorMapDemo.png"
              alt="card image"
              className="card-image"
            />
            <div className="card-title">Facility name - Location</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FacilitiesManager;
