import { SynButton } from "@synergy-design-system/react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

function NotFoundPage() {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<div className="not-found-container">
			<h1 className="not-found-title">404</h1>
			<p className="not-found-message">
				The page you are looking for does not exist.
			</p>
			<SynButton
				variant="filled"
				className="not-found-button"
				onClick={handleGoHome}
			>
				Go Back
			</SynButton>
		</div>
	);
}

export default NotFoundPage;
