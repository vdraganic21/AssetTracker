import Konva from "konva";
import "./FloorMapDisplay.css";
import { SynButton, SynIcon } from "@synergy-design-system/react";
import { useEffect, useRef } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

function FloorMapDisplay() {
	const stageRef = useRef<Konva.Stage>(null);
	const containerRef = useRef(null);

	const FloorMapImage = () => {
		const [image] = useImage("/floorMapDemo.png");
		return <Image image={image} />;
	};

	useEffect(() => {
		const resizeStage = () => {
			if (stageRef.current && containerRef.current) {
				const { offsetWidth, offsetHeight } = containerRef.current;
				stageRef.current.width(offsetWidth);
				stageRef.current.height(offsetHeight);
			}
		};

		window.addEventListener("resize", resizeStage);
		resizeStage();

		return () => {
			window.removeEventListener("resize", resizeStage);
		};
	}, []);

	return (
		<div className="floor-map-display">
			<div className="konva-stage-container" ref={containerRef}>
				<Stage ref={stageRef}>
					<Layer>
						<FloorMapImage />
					</Layer>
				</Stage>
			</div>
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
