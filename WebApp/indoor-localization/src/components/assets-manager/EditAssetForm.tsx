import {
	SynButton,
	SynDivider,
	SynIcon,
	SynInput,
} from "@synergy-design-system/react";
import Footer from "../common/Footer";
import "../common/Form.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SynInputEvent } from "@synergy-design-system/react/components/checkbox.js";
import { AssetService } from "../../services/AssetService";
import PopUpConfirmation from "../common/PopUpConfirmation";
import { Asset } from "../../entities/Asset";

function EditAssetForm() {
	const navigate = useNavigate();
	const { id } = useParams();
	const assetId = parseInt(id ?? "0", 10);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [asset, setAsset] = useState<Asset | null>(null);
	const [assetName, setAssetName] = useState("");
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		const fetchAsset = async () => {
			const fetchedAsset = await AssetService.Get(assetId);
			if (!fetchedAsset) {
				navigate("/assets");
			} else {
				setAsset(fetchedAsset);
				setAssetName(fetchedAsset.name);
			}
		};
		fetchAsset();
	}, [assetId, navigate]);

	const handlePopUpConfirm = async () => {
		await AssetService.Delete(assetId);
		navigate("/assets");
	};

	const handlePopUpCancel = () => {
		setPopupOpen(false);
	};

	const handleCancel = () => {
		navigate("/assets");
	};

	const handleNameChange = (e: SynInputEvent) => {
		const newName = (e.target as HTMLInputElement).value;
		setAssetName(newName);
		validateForm(newName);
	};

	const validateForm = (name: string) => {
		setIsFormValid(!!name.trim());
	};

	const handleEdit = async () => {
		if (asset) {
			asset.name = assetName;
			const updatedAsset = asset;
			const isUpdated = await AssetService.Update(updatedAsset);
			if (isUpdated) navigate("/assets");
		}
	};

	return (
		<>
			<div className="content content-width content-border content-margin">
				<div className="header-row">
					<span className="syn-heading--3x-large">Edit asset</span>
					<div className="button-group">
						<SynIcon
							library="fa"
							name="fas-trash"
							className="danger-icon"
							onClick={() => setPopupOpen(true)}
						/>
					</div>
				</div>
				<SynDivider className="content-divider" />
				<SynInput
					name="name"
					label="Name"
					className="form-input-width"
					value={assetName}
					onSynInput={handleNameChange}
				/>
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
