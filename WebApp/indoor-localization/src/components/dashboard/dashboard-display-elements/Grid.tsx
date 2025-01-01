import { Line, Text } from "react-konva";

interface GridProps {
	x: number;
	y: number;
	imageWidth: number;
	imageHeight: number;
	gridSize?: number;
}

function Grid({ x, y, imageWidth, imageHeight, gridSize = 50 }: GridProps) {
	const gridLines = [];
	const axisNumbers = [];

	const horizontalLinesCount = Math.ceil(imageHeight / gridSize);
	for (let i = 0; i <= horizontalLinesCount; i++) {
		const yOffset = y - i * gridSize;
		if (yOffset < 0) break;

		gridLines.push(
			<Line
				key={`h-${i}`}
				points={[
					x,
					yOffset,
					x + Math.ceil(imageWidth / gridSize) * gridSize,
					yOffset,
				]}
				stroke="rgba(0, 0, 0, 0.2)"
				strokeWidth={1}
			/>
		);

		if (i !== 0) {
			axisNumbers.push(
				<Text
					key={`y-num-${i}`}
					x={x - 30}
					y={yOffset - 10}
					text={`${i * gridSize}`}
					fontSize={12}
					fill="black"
				/>
			);
		}
	}

	const verticalLinesCount = Math.ceil(imageWidth / gridSize);
	for (let i = 0; i <= verticalLinesCount; i++) {
		const xOffset = x + i * gridSize;
		if (xOffset < 0) break;

		gridLines.push(
			<Line
				key={`v-${i}`}
				points={[
					xOffset,
					y,
					xOffset,
					y - Math.ceil(imageHeight / gridSize) * gridSize,
				]}
				stroke="rgba(0, 0, 0, 0.2)"
				strokeWidth={1}
			/>
		);

		if (i !== 0) {
			axisNumbers.push(
				<Text
					key={`x-num-${i}`}
					x={xOffset - 10}
					y={y + 5}
					text={`${i * gridSize}`}
					fontSize={12}
					fill="black"
				/>
			);
		}
	}

	gridLines.push(
		<Line
			key="x-axis"
			points={[x, y, x + imageWidth, y]}
			stroke="rgba(0, 0, 0, 0.5)"
			strokeWidth={5}
		/>,
		<Line
			key="y-axis"
			points={[x, 0, x, y]}
			stroke="rgba(0, 0, 0, 0.5)"
			strokeWidth={5}
		/>
	);

	axisNumbers.push(
		<Text
			key="origin"
			x={x - 15}
			y={y + 5}
			text="0"
			fontSize={12}
			fill="black"
		/>
	);

	return (
		<>
			{gridLines}
			{axisNumbers}
		</>
	);
}

export default Grid;
