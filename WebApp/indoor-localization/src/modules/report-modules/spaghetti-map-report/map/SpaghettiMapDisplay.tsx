import "./SpaghettiMapDisplay.css";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import { Facility } from "../../../../entities/Facility";
import SpaghettiMapLinesLayer from "./SpaghettiMapLinesLayer";
import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";

function SpaghettiMapDisplay({
	facility,
	displayedLogs,
}: {
	facility: Facility | null;
	displayedLogs: AssetPositionHistoryLog[];
}) {
	if (!facility) {
		return <div></div>;
	}
	const [image] = useImage(facility.imageBase64);
	const [imageScale, setImageScale] = useState(1);
	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const FloorMapImage = () => {
		const x = (stageSize.width - imageSize.width * imageScale) / 2;
		const y = (stageSize.height - imageSize.height * imageScale) / 2;

		return <Image image={image} x={x} y={y} />;
	};
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

	useEffect(() => {
		if (image && stageSize.width && stageSize.height) {
			setImageSize({ width: image.width, height: image.height });

			const initialImageScale = Math.min(
				(stageSize.width - 64) / image.width,
				(stageSize.height - 64) / image.height
			);
			setImageScale(initialImageScale);
		}
	}, [image, stageSize, facility]);

	return (
		<div className="floor-map-display">
			<div className="konva-stage-container" ref={containerRef}>
				<Stage width={stageSize.width} height={stageSize.height}>
					<Layer scale={{ x: imageScale, y: imageScale }}>
						<FloorMapImage />
						<SpaghettiMapLinesLayer
							logs={displayedLogs}
							x={(stageSize.width - imageSize.width * imageScale) / 2}
							y={
								(stageSize.height - imageSize.height * imageScale) / 2 +
								imageSize.height
							}
						/>
					</Layer>
				</Stage>
			</div>
		</div>
	);
}

export default SpaghettiMapDisplay;
