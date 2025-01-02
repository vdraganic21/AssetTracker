import { Line, Text } from "react-konva";

interface GridProps {
	x: number;
	y: number;
	imageWidth: number;
	imageHeight: number;
	gridSize?: number;
	gridColor?: string;
	axisColor?: string;
	textColor?: string;
}

function Grid({
	x,
	y,
	imageWidth,
	imageHeight,
	gridSize = 50,
	gridColor = "rgba(0, 0, 0, 0.2)",
	axisColor = "rgba(0, 0, 0, 0.5)",
	textColor = "black",
}: GridProps) {
	const createHorizontalLines = () => {
		const lines = [];
		for (let i = 0; i <= Math.ceil(imageHeight / gridSize); i++) {
			const yOffset = y - i * gridSize;
			if (yOffset < 0) break;

			lines.push(
				<Line
					key={`h-${i}`}
					points={[
						x,
						yOffset,
						x + Math.ceil(imageWidth / gridSize) * gridSize,
						yOffset,
					]}
					stroke={gridColor}
					strokeWidth={1}
				/>
			);
		}
		return lines;
	};

	const createVerticalLines = () => {
		const lines = [];
		for (let i = 0; i <= Math.ceil(imageWidth / gridSize); i++) {
			const xOffset = x + i * gridSize;
			if (xOffset < 0) break;

			lines.push(
				<Line
					key={`v-${i}`}
					points={[
						xOffset,
						y,
						xOffset,
						y - Math.ceil(imageHeight / gridSize) * gridSize,
					]}
					stroke={gridColor}
					strokeWidth={1}
				/>
			);
		}
		return lines;
	};

	const createAxisLines = () => [
		<Line
			key="x-axis"
			points={[x, y, x + Math.ceil(imageWidth / gridSize) * gridSize, y]}
			stroke={axisColor}
			strokeWidth={5}
		/>,
		<Line
			key="y-axis"
			points={[x, y - Math.ceil(imageHeight / gridSize) * gridSize, x, y]}
			stroke={axisColor}
			strokeWidth={5}
		/>,
	];

	const createAxisNumbers = () => {
		const numbers = [];
		for (let i = 1; i <= Math.ceil(imageHeight / gridSize); i++) {
			const yOffset = y - i * gridSize;
			if (yOffset < 0) break;
			numbers.push(
				<Text
					key={`y-num-${i}`}
					x={x - 30}
					y={yOffset - 10}
					text={`${i * gridSize}`}
					fontSize={12}
					fill={textColor}
				/>
			);
		}
		for (let i = 1; i <= Math.ceil(imageWidth / gridSize); i++) {
			const xOffset = x + i * gridSize;
			if (xOffset < 0) break;
			numbers.push(
				<Text
					key={`x-num-${i}`}
					x={xOffset - 10}
					y={y + 5}
					text={`${i * gridSize}`}
					fontSize={12}
					fill={textColor}
				/>
			);
		}
		numbers.push(
			<Text
				key="origin"
				x={x - 15}
				y={y + 5}
				text="0"
				fontSize={12}
				fill={textColor}
			/>
		);
		return numbers;
	};

	return (
		<>
			{createHorizontalLines()}
			{createVerticalLines()}
			{createAxisLines()}
			{createAxisNumbers()}
		</>
	);
}

export default Grid;
