import { SynButton, SynDivider, SynInput } from "@synergy-design-system/react";
import Footer from "../common/Footer";
import "../common/Form.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { Asset } from "../../entities/Asset";
import { Point } from "../../entities/Point";
import { AssetService } from "../../services/AssetService";

function AddAssetForm() {
	const navigate = useNavigate();

	const [assetName, setAssetName] = useState("");
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

	const handleAdd = () => {
		const newAsset = new Asset(
			0,
			assetName,
			0,
			new Point(0, 0),
			new Date(),
			true,
			[]
		);

		const isAdded = AssetService.Add(newAsset);
		if (isAdded) navigate("/assets");
	};

	return (
		<>
			<div className="content content-border">
				<span className="syn-heading--3x-large">Add asset</span>
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

export default AddAssetForm;
