import Footer from "../Footer";
import "../Manager.css";

const facilities = [
  {
    id: 1,
    name: "Facility",
    location: "Location"
  },
];

const sortOptions = [
  { name: "Name - ascending", value: "nameAsc" },
  { name: "Name - descending", value: "nameDesc" },
];

function FacilitiesManager(){
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Facilities</span>
      </div>
      <Footer></Footer>
    </>
  );
}

export default FacilitiesManager;
