import {
  SynButton,
  SynDivider,
  SynFile,
  SynInput,
} from "@synergy-design-system/react";
import Footer from "../Footer";
import "../Form.css";

function AddFacilityForm() {
  return (
    <>
      <div className="content content-border">
        <span className="syn-heading--3x-large">Add facility</span>
        <SynDivider className="content-divider" />
        <SynInput
          name="name"
          label="Name"
          className="form-input-width"
        ></SynInput>
        <SynFile label="Floor map image" className="form-top-margin"></SynFile>
        <div className="form-button-container">
          <SynButton className="form-button">Cancel</SynButton>
          <SynButton variant="filled" className="form-button">
            Add
          </SynButton>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddFacilityForm;
