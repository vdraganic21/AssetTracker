import {
	SynButton,
	SynDivider,
	SynIcon,
	SynInput,
} from "@synergy-design-system/react";
import Footer from "../Footer";
import "../Form.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { AssetService } from "../../services/AssetService";
import PopUpConfirmation from "../PopUpConfirmation";

function EditAssetForm() {
	const navigate = useNavigate();
	const { id } = useParams();
	const assetId = parseInt(id ?? "0", 10);
	const [isPopupOpen, setPopupOpen] = useState(false);

	const handlePopUpConfirm = () => {
		console.log("Confirmed!");
		setPopupOpen(false);
	};

	const handlePopUpCancel = () => {
		setPopupOpen(false);
	};
	let asset = AssetService.Get(assetId);

	useEffect(() => {
		if (asset == null) navigate("/assets");
	});

	const [assetName, setAssetName] = useState(asset!.name);
	const [isFormValid, setIsFormValid] = useState(false);

	const handleCancel = () => {
		navigate("/assets");
	};

	const handleNameChange = (e: SynInputEvent) => {
		const assetName = (e.target as HTMLInputElement).value;
		setAssetName(assetName);
		validateForm(assetName);
	};

	const validateForm = (name: string) => {
		setIsFormValid(!!name.trim());
	};

	const handleEdit = () => {
		asset!.name = assetName;
		const newAsset = asset;

		if (newAsset) {
			const isUpdated = AssetService.Update(newAsset);
			if (isUpdated) navigate("/assets");
		}
	};

	return (
		<>
			<div className="content content-border">
				<div className="header-row">
					<span className="syn-heading--3x-large">Edit asset</span>
					<div className="button-group">
						<SynIcon
							library="fa"
							name="fas-trash"
							className="danger-icon"
							onClick={() => {
								setPopupOpen(true);
							}}
						></SynIcon>
					</div>
				</div>
				<SynDivider className="content-divider" />
				<SynInput
					name="name"
					label="Name"
					className="form-input-width"
					value={assetName}
					onSynInput={handleNameChange}
				></SynInput>
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
					title={`Are you sure you want to remove '${asset?.name}'?`}
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

export default EditAssetForm;
