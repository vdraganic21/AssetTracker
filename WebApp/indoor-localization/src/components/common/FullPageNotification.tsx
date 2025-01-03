import "./FullPageNotification.css";
import { SynButton } from "@synergy-design-system/react";

interface FullPageNotificationProps {
	title: string;
	message: string;
	buttonLabel: string;
	onButtonClick: () => void;
}

function FullPageNotification({
	title,
	message,
	buttonLabel,
	onButtonClick,
}: FullPageNotificationProps) {
	return (
		<div className="full-page-notification-container">
			<h1 className="full-page-notification-title">{title}</h1>
			<p className="full-page-notification-message">{message}</p>
			<SynButton
				variant="filled"
				className="full-page-notification-button"
				onClick={onButtonClick}
			>
				{buttonLabel}
			</SynButton>
		</div>
	);
}

export default FullPageNotification;
