import "./FloorMapDisplay.css";
import { SynButton, SynIcon } from "@synergy-design-system/react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

function FloorMapDisplay() {
	const FloorMapImage = () => {
		const [image] = useImage("/floorMapDemo.png");
		return <Image image={image} />;
	};

	return (
		<div className="floor-map-display">
			<Stage width={window.innerWidth} height={window.innerHeight}>
				<Layer draggable={true}>
					<FloorMapImage />
				</Layer>
			</Stage>
			<div className="bottom-right-container">
				<div className="facility-column">
					<p className="facility-name">Facility name</p>
				</div>
				<div className="buttons-column">
					<SynButton>
						<SynIcon
							library="fa"
							name="fas-rotate-right"
							className="button-icon"
						/>
					</SynButton>
					<SynButton>
						<SynIcon library="fa" name="fas-plus" className="button-icon" />
					</SynButton>
					<SynButton>
						<SynIcon library="fa" name="fas-minus" className="button-icon" />
					</SynButton>
				</div>
			</div>
		</div>
	);
}

export default FloorMapDisplay;
