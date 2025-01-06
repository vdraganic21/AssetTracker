import { Layer } from "react-konva";
import { Asset } from "../../../entities/Asset";
import AssetDot from "./AssetDot";
import AssetDotNameBox from "./AssetDotNameBox";

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
		<>
			<Layer scale={{ x: scale, y: scale }}>
				{assets.map((asset, index) => {
					const assetPosition = asset.GetPosition();
					return (
						<AssetDot
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
						/>
					);
				})}
			</Layer>
			<Layer scale={{ x: scale, y: scale }}>
				{assets.map((asset, index) => {
					const assetPosition = asset.GetPosition();
					return (
						<AssetDotNameBox
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
							name={asset.name}
						/>
					);
				})}
			</Layer>
		</>
	);
}

export default AssetDisplayLayer;
