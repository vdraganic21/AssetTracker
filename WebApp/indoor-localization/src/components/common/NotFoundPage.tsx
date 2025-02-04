import { useNavigate } from "react-router-dom";
import FullPageNotification from "./FullPageNotification";

function NotFoundPage() {
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate("/");
	};

	return (
		<FullPageNotification
			title="404"
			message="The page you are looking for does not exist."
			buttonLabel="Go Back"
			onButtonClick={handleGoHome}
		/>
	);
}

export default NotFoundPage;
