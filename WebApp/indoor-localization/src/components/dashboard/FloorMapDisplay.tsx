import Konva from "konva";
import "./FloorMapDisplay.css";
import { SynButton, SynIcon } from "@synergy-design-system/react";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

function FloorMapDisplay() {
	const stageRef = useRef<Konva.Stage>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
	const [image] = useImage("/floorMapDemo.png");

	useEffect(() => {
		if (image) {
			setImageSize({ width: image.width, height: image.height });
		}
	}, [image]);

	const resizeStage = () => {
		if (containerRef.current) {
			const { clientWidth, clientHeight } = containerRef.current;
			setStageSize({ width: clientWidth, height: clientHeight });
		}
	};

	useEffect(() => {
		window.addEventListener("resize", resizeStage);
		resizeStage();

		return () => {
			window.removeEventListener("resize", resizeStage);
		};
	}, []);

	const FloorMapImage = () => <Image image={image} />;

	return (
		<div className="floor-map-display">
			<div className="konva-stage-container" ref={containerRef}>
				<Stage
					ref={stageRef}
					width={stageSize.width}
					height={stageSize.height}
					draggable
					dragBoundFunc={(pos) => {
						if (!imageSize.width || !imageSize.height) {
							return pos;
						}

						const { width: containerWidth, height: containerHeight } =
							stageSize;

						const xMin = Math.min(0, containerWidth - imageSize.width * 1.5);
						const xMax = Math.max(0, imageSize.width * 0.5);

						const yMin = Math.min(0, containerHeight - imageSize.height * 1.5);
						const yMax = Math.max(0, imageSize.height * 0.5);

						return {
							x: Math.max(Math.min(pos.x, xMax), xMin),
							y: Math.max(Math.min(pos.y, yMax), yMin),
						};
					}}
				>
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
