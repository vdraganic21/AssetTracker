import Footer from "../Footer";
import "../Manager.css";

const reports = [
  {
    id: 1,
    name: "Facility",
    location: "Location"
  },
];

function ReportsPage(){
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Tabular Reports</span>
        <div>
          <span className="syn-heading--3x-large">Graphical Reports</span>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ReportsPage;
