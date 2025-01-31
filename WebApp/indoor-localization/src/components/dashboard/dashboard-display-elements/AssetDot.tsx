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
	const isHighlighted = HighlightedAssetService.getHighlightedAssetId() === id;

	return (
		<Circle
			fill={"#0ca2eb"}
			width={isHighlighted ? dotWidth * 1.5 : dotWidth}
			height={isHighlighted ? dotWidth * 1.5 : dotWidth}
			x={x}
			y={y}
			onClick={() => {
				HighlightedAssetService.setHighlightedAssetId(id);
			}}
		/>
	);
}

export default AssetDot;
