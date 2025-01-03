import Konva from "konva";
import "./FloorMapDisplay.css";
import { SynButton, SynIcon } from "@synergy-design-system/react";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";
import Grid from "./dashboard-display-elements/Grid";
import { Facility } from "../../entities/Facility";
import AssetDispalyLayer from "./dashboard-display-elements/AssetDisplayLayer";

function FloorMapDisplay({ facility }: { facility: Facility }) {
	const stageRef = useRef<Konva.Stage>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [assets, setAssets] = useState(facility.GetAssets());

	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
	const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
	const [zoomLevel, setZoomLevel] = useState(100);
	const [image] = useImage(facility.imageBase64);
	const [imageScale, setImageScale] = useState(1);
	const [isGridVisible, setIsGridVisible] = useState(false);
	const scale = imageScale * (zoomLevel / 100);
	const refreshIntervalMillis = 500;

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedAssets = facility.GetAssets();
			setAssets(updatedAssets);
		}, refreshIntervalMillis);

		return () => clearInterval(interval);
	}, [facility]);

	useEffect(() => {
		if (image && stageSize.width && stageSize.height) {
			setImageSize({ width: image.width, height: image.height });

			const initialImageScale = Math.min(
				(stageSize.width - 64) / image.width,
				(stageSize.height - 64) / image.height
			);
			setImageScale(initialImageScale);
		}
	}, [image, stageSize]);

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

	const updateZoom = (increment: number) => {
		setZoomLevel((prevZoom) => {
			const newZoom = Math.min(Math.max(prevZoom + increment, 50), 150);
			return newZoom;
		});
	};

	const handleWheel = (e: React.WheelEvent) => {
		const zoomIncrement = e.deltaY < 0 ? 10 : -10;
		updateZoom(zoomIncrement);
	};

	const resetZoom = () => {
		setZoomLevel(100);
		if (stageRef.current) {
			stageRef.current.position({ x: 0, y: 0 });
		}
	};

	const FloorMapImage = () => {
		const x = (stageSize.width - imageSize.width * imageScale) / 2;
		const y = (stageSize.height - imageSize.height * imageScale) / 2;

		return <Image image={image} x={x} y={y} />;
	};

	const stageBoundaryFunc = (pos: { x: number; y: number }) => {
		if (!imageSize.width || !imageSize.height) {
			return pos;
		}

		const { width: containerWidth, height: containerHeight } = stageSize;

		const xMin = Math.min(
			0,
			-((containerWidth - imageSize.width * scale) / 2) -
				imageSize.width * scale * 0.75
		);
		const xMax = Math.max(
			0,
			(containerWidth - imageSize.width * scale) / 2 +
				imageSize.width * scale * 0.75
		);

		const yMin = Math.min(
			0,
			-(containerHeight - imageSize.height * scale) / 2 -
				imageSize.height * scale * 0.75
		);
		const yMax = Math.max(
			0,
			(containerHeight - imageSize.height * scale) / 2 +
				imageSize.height * scale * 0.75
		);

		return {
			x: Math.max(Math.min(pos.x, xMax), xMin),
			y: Math.max(Math.min(pos.y, yMax), yMin),
		};
	};

	const handleZoomIn = () => updateZoom(10);
	const handleZoomOut = () => updateZoom(-10);

	return (
		<div className="floor-map-display">
			<div
				className="konva-stage-container"
				ref={containerRef}
				onWheel={handleWheel}
			>
				<Stage
					ref={stageRef}
					width={stageSize.width}
					height={stageSize.height}
					draggable
					dragBoundFunc={stageBoundaryFunc}
				>
					<Layer scale={{ x: scale, y: scale }}>
						<FloorMapImage />
						{isGridVisible && (
							<Grid
								x={(stageSize.width - imageSize.width * imageScale) / 2}
								y={
									(stageSize.height - imageSize.height * imageScale) / 2 +
									imageSize.height
								}
								imageHeight={imageSize.height}
								imageWidth={imageSize.width}
							/>
						)}
					</Layer>
					<AssetDispalyLayer
						assets={assets}
						scale={scale}
						x={(stageSize.width - imageSize.width * imageScale) / 2}
						y={
							(stageSize.height - imageSize.height * imageScale) / 2 +
							imageSize.height
						}
					/>
				</Stage>
			</div>

			<div className="bottom-right-container">
				<div className="facility-column">
					<p className="facility-name unselectable">{facility.name}</p>
				</div>
				<div className="buttons-column">
					<SynButton onClick={() => setIsGridVisible(!isGridVisible)}>
						<SynIcon
							library="fa"
							name={isGridVisible ? "fas-border-none" : "fas-border-all"}
							className="button-icon"
						/>
					</SynButton>
					<SynButton onClick={resetZoom}>
						<SynIcon
							library="fa"
							name="fas-rotate-right"
							className="button-icon"
						/>
					</SynButton>
					<SynButton onClick={handleZoomIn}>
						<SynIcon library="fa" name="fas-plus" className="button-icon" />
					</SynButton>
					<p className="unselectable">{zoomLevel}%</p>
					<SynButton onClick={handleZoomOut}>
						<SynIcon library="fa" name="fas-minus" className="button-icon" />
					</SynButton>
				</div>
			</div>
		</div>
	);
}

export default FloorMapDisplay;
