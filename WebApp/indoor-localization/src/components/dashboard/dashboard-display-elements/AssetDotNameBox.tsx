import { Rect, Text } from "react-konva";

function AssetDotNameBox({
	scale,
	x,
	y,
	name,
}: {
	scale: number;
	x: number;
	y: number;
	name: string;
}) {
	const borderColor = "#0ca2eb";
	const textFontSize = 14 / scale;

	const textWidth = name.length * (textFontSize / 1.8);
	const rectWidth = textWidth + 20;
	const rectHeight = 24 / scale;
	const yOffset = 15 / scale;

	return (
		<>
			<Rect
				x={x - rectWidth / 2}
				y={y - rectHeight - yOffset}
				width={rectWidth}
				height={rectHeight}
				fill={"white"}
				stroke={borderColor}
				strokeWidth={2 / scale}
				cornerRadius={99 / scale}
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
				fill={"black"}
				padding={0}
				margin={0}
				offsetY={yOffset}
			/>
		</>
	);
}

export default AssetDotNameBox;
