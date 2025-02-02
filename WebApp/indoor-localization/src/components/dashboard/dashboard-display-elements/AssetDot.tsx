import { Circle } from "react-konva";
import HighlightedAssetService from "../../../services/HighlightedAssetService";

function AssetDot({
	scale,
	x,
	y,
	id,
}: {
	scale: number;
	x: number;
	y: number;
	id: number;
}) {
	const dotWidth = 15 / scale;

	return (
		<Circle
			fill={"#0ca2eb"}
			width={dotWidth}
			height={dotWidth}
			x={x}
			y={y}
			onClick={() => {
				HighlightedAssetService.setHighlightedAssetId(id);
			}}
		/>
	);
}

export default AssetDot;
