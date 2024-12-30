import { SynButton } from "@synergy-design-system/react";
import "./PopUpConfirmation.css";

interface PopupProps {
	title: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmText: string;
	cancelText?: string;
	children?: React.ReactNode;
}

function PopUpConfirmation({
	title,
	onConfirm,
	onCancel,
	confirmText,
	cancelText = "Cancel",
	children,
}: PopupProps) {
	return (
		<div className="popup-overlay" onClick={onCancel}>
			<div
				className="popup-container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<h2 className="popup-title">{title}</h2>
				<div className="popup-content">{children}</div>
				<div className="popup-actions">
					<SynButton variant="outline" onClick={onConfirm}>
						{confirmText}
					</SynButton>
					<SynButton variant="filled" onClick={onCancel}>
						{cancelText}
					</SynButton>
				</div>
			</div>
		</div>
	);
}

export default PopUpConfirmation;
