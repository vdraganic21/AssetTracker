import { Circle, Layer } from "react-konva";
import { Asset } from "../../../entities/Asset";

function AssetDisplayLayer({
	scale,
	assets,
	x,
	y,
}: {
	scale: number;
	assets: Asset[];
	x: number;
	y: number;
}) {
	return (
		<Layer scale={{ x: scale, y: scale }}>
			{assets.map((asset) => {
				const assetPosition = asset.GetPosition();
				console.log(assetPosition);
				return (
					<Circle
						fill={"red"}
						width={15 / scale}
						height={15 / scale}
						x={x + assetPosition.x}
						y={y - assetPosition.y}
					/>
				);
			})}
		</Layer>
	);
}

export default AssetDisplayLayer;
