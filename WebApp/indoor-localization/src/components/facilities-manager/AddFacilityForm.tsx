import {
	SynButton,
	SynDivider,
	SynFile,
	SynInput,
} from "@synergy-design-system/react";
import Footer from "../common/Footer";
import "../common/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	SynChangeEvent,
	SynInputEvent,
} from "@synergy-design-system/react/components/checkbox.js";
import { FacilityService } from "../../services/FacilityService";
import { Facility } from "../../entities/Facility";

function AddFacilityForm() {
	const navigate = useNavigate();

	const [facilityName, setFacilityName] = useState("");
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState("");
	const [previewSrc, setPreviewSrc] = useState<string | null>(null);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleCancel = () => {
		navigate("/facilities");
	};

	const handleNameChange = (e: SynInputEvent) => {
		const facilityName = (e.target as HTMLInputElement).value;
		setFacilityName(facilityName);
		validateForm(facilityName, file);
	};

	const handleFileChange = (e: SynChangeEvent) => {
		const selectedFile = (e.target as HTMLInputElement).files?.[0];

		if (selectedFile == null) {
			setFileError("No file selected.");
			setFile(null);
			setPreviewSrc(null);
		} else if (selectedFile && selectedFile.type !== "image/png") {
			setFileError("Only .png files are allowed.");
			setFile(null);
			setPreviewSrc(null);
		} else {
			setFileError("");
			setFile(selectedFile);

			const reader = new FileReader();
			reader.onload = () => {
				setPreviewSrc(reader.result as string);
			};
			reader.readAsDataURL(selectedFile);
		}

		validateForm(facilityName, selectedFile ?? null);
	};

	const validateForm = (name: string, file: File | null) => {
		setIsFormValid(!!name.trim() && file !== null && !fileError);
	};

	const handleAdd = () => {
		if (!file) return;

		const reader = new FileReader();
		reader.onload = async () => {
			const base64ImageString = reader.result as string;
			const newFacility = new Facility(
				0,
				facilityName,
				base64ImageString,
				[],
				[]
			);
			const isAdded = await FacilityService.Add(newFacility);
			if (isAdded) navigate("/facilities");
		};
		reader.readAsDataURL(file);
	};

	return (
		<>
			<div className="content content-width content-border content-margin">
				<span className="syn-heading--3x-large">Add facility</span>
				<SynDivider className="content-divider" />
				<SynInput
					name="name"
					label="Name"
					className="form-input-width"
					value={facilityName}
					onSynInput={handleNameChange}
				></SynInput>
				<SynFile
					label="Floor map image"
					className="form-top-margin"
					onSynChange={handleFileChange}
				></SynFile>
				{fileError && <p style={{ color: "red" }}>{fileError}</p>}
				{previewSrc && (
					<img
						src={previewSrc}
						className="image-preview"
						alt="Selected floor map"
					/>
				)}
				<div className="form-button-container">
					<SynButton className="form-button" onClick={handleCancel}>
						Cancel
					</SynButton>
					<SynButton
						variant="filled"
						className="form-button"
						disabled={!isFormValid}
						onClick={handleAdd}
					>
						Add
					</SynButton>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default AddFacilityForm;
