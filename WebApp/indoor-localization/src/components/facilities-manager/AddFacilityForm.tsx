import { SynDivider, SynFile, SynInput } from "@synergy-design-system/react";
import Footer from "../Footer";
import "../Form.css";

function AddFacilityForm() {
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Add facility</span>
        <SynDivider className="content-divider" />
        <SynInput name="name" label="Name"></SynInput>
        <SynFile label="Floor map image" className="form-top-margin"></SynFile>
      </div>
      <Footer />
    </>
  );
}

export default AddFacilityForm;
