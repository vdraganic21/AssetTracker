import { Circle } from "react-konva";

function AssetDot({ scale, x, y }: { scale: number; x: number; y: number }) {
	const dotWidth = 15 / scale;

	return (
		<Circle fill={"#0ca2eb"} width={dotWidth} height={dotWidth} x={x} y={y} />
	);
}

export default AssetDot;
