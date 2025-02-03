import { Layer } from "react-konva";
import { Asset } from "../../../entities/Asset";
import AssetDot from "./AssetDot";
import AssetDotNameBox from "./AssetDotNameBox";
import HiddenAssetsService from "../../../services/HiddenAssetsService";
import { useState, useEffect } from "react";
import { AssetService } from "../../../services/AssetService";

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
	const [displayAssets, setDisplayAssets] = useState<Asset[]>([]);

	useEffect(() => {
		setDisplayAssets(assets);
	}, [assets]);

	const fetchAndUpdateAssets = async () => {
		const updatedAssets: Asset[] = [];
		for (let asset of assets) {
			const newAsset = await AssetService.Get(asset.id);
			if (newAsset) updatedAssets.push(newAsset);
		}
		setDisplayAssets(updatedAssets);
	};

	useEffect(() => {
		const intervalId = setInterval(async () => {
			await fetchAndUpdateAssets();
		}, 500);

		return () => clearInterval(intervalId);
	}, [assets]);

	return (
		<>
			<Layer scale={{ x: scale, y: scale }}>
				{displayAssets.map((asset, index) => {
					if (HiddenAssetsService.IsAssetHidden(asset.id)) return null;

					const assetPosition = asset.position;
					return (
						<AssetDot
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
							id={asset.id}
						/>
					);
				})}
			</Layer>
			<Layer scale={{ x: scale, y: scale }}>
				{displayAssets.map((asset, index) => {
					if (HiddenAssetsService.IsAssetHidden(asset.id)) return null;

					const assetPosition = asset.position;
					return (
						<AssetDotNameBox
							key={index}
							scale={scale}
							x={assetPosition.x + x}
							y={y - assetPosition.y}
							name={asset.name}
							id={asset.id}
						/>
					);
				})}
			</Layer>
		</>
	);
}

export default AssetDisplayLayer;
