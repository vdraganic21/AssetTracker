import { SynSpinner } from "@synergy-design-system/react";
import "./Spinner.css";

export default function Spinner({ text }: { text: string }) {
	return (
		<div className="spinner-container">
			<SynSpinner className="spinner" />
			<p className="spinner-text">{text}</p>
		</div>
	);
}
