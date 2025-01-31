import { Rect, Text } from "react-konva";
import HighlightedAssetService from "../../../services/HighlightedAssetService";

function AssetDotNameBox({
	scale,
	x,
	y,
	name,
	id,
}: {
	scale: number;
	x: number;
	y: number;
	name: string;
	id: number;
}) {
	const borderColor = "#0ca2eb";
	const textFontSize = 14 / scale;

	const textWidth = name.length * (textFontSize / 1.8);
	const rectWidth = textWidth + 20;
	const rectHeight = 24 / scale;
	const yOffset = 15 / scale;
	const isHighlighted = HighlightedAssetService.getHighlightedAssetId() === id;

	return (
		<>
			<Rect
				x={x - rectWidth / 2}
				y={y - rectHeight - yOffset}
				width={rectWidth}
				height={rectHeight}
				fill={isHighlighted ? "#0ca2eb" : "white"}
				stroke={borderColor}
				strokeWidth={2 / scale}
				cornerRadius={99 / scale}
				onClick={() => {
					HighlightedAssetService.setHighlightedAssetId(id);
				}}
			/>

			<Text
				text={name}
				x={x - rectWidth / 2}
				y={y - rectHeight}
				width={rectWidth}
				height={rectHeight}
				align="center"
				verticalAlign="middle"
				fontSize={textFontSize}
				fill={isHighlighted ? "white" : "black"}
				padding={0}
				margin={0}
				offsetY={yOffset}
				onClick={() => {
					HighlightedAssetService.setHighlightedAssetId(id);
				}}
			/>
		</>
	);
}

export default AssetDotNameBox;
