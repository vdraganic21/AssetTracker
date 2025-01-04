import {
	SynButton,
	SynDivider,
	SynFile,
	SynInput,
	SynIcon,
} from "@synergy-design-system/react";
import Footer from "../common/Footer";
import "../common/Form.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	SynInputEvent,
	SynChangeEvent,
} from "@synergy-design-system/react/components/checkbox.js";
import { FacilityService } from "../../services/FacilityService";
import PopUpConfirmation from "../common/PopUpConfirmation";

function EditFacilityForm() {
	const navigate = useNavigate();
	const { id } = useParams();
	const facilityId = parseInt(id ?? "0", 10);
	const facility = FacilityService.Get(facilityId);

	useEffect(() => {
		if (facility == null) navigate("/facilities");
	}, [facility, navigate]);

	const [facilityName, setFacilityName] = useState(facility?.name ?? "");
	const [file, setFile] = useState<File | null>(null);
	const [fileError, setFileError] = useState("");
	const [previewSrc, setPreviewSrc] = useState<string | null>(
		facility?.imageBase64 ?? null
	);
	const [isFormValid, setIsFormValid] = useState(false);
	const [isPopupOpen, setPopupOpen] = useState(false);

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
		setIsFormValid(
			!!name.trim() &&
				(previewSrc == facility?.imageBase64 || (file !== null && !fileError))
		);
	};

	const handleEdit = () => {
		if (!facility) return;

		if (facilityName.trim() !== "") facility.name = facilityName;

		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				const base64ImageString = reader.result as string;
				facility.imageBase64 = base64ImageString;
			};
			reader.readAsDataURL(file);
		}

		let isUpdated = FacilityService.Update(facility);

		if (isUpdated) {
			navigate("/facilities");
		}
	};
	const handleDelete = () => {
		FacilityService.Delete(facilityId);
		navigate("/facilities");
	};

	const handlePopUpConfirm = () => {
		handleDelete();
	};

	const handlePopUpCancel = () => {
		setPopupOpen(false);
	};

	return (
		<>
			<div className="content content-width content-border">
				<div className="header-row">
					<span className="syn-heading--3x-large">Edit facility</span>
					<div className="button-group">
						<SynIcon
							library="fa"
							name="fas-trash"
							className="danger-icon"
							onClick={() => setPopupOpen(true)}
						></SynIcon>
					</div>
				</div>
				<SynDivider className="content-divider" />
				<SynInput
					name="name"
					label="Name"
					className="form-input-width"
					value={facilityName}
					onSynInput={handleNameChange}
				/>
				<SynFile
					label="Floor map image"
					className="form-top-margin"
					onSynChange={handleFileChange}
				/>
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
						onClick={handleEdit}
					>
						Edit
					</SynButton>
				</div>
			</div>
			{isPopupOpen && (
				<PopUpConfirmation
					title={`Are you sure you want to remove '${facility?.name}'?`}
					onConfirm={handlePopUpConfirm}
					onCancel={handlePopUpCancel}
					confirmText="Remove"
					cancelText="Cancel"
				>
					<p>This action cannot be undone.</p>
				</PopUpConfirmation>
			)}
			<Footer />
		</>
	);
}

export default EditFacilityForm;
