import { Layer, Line, Rect } from "react-konva";
import { Zone } from "../../../entities/Zone";
import { Point } from "../../../entities/Point";

function convertPointsToCoordsList(points: Point[]) {
	let coordsList: number[] = [];
	for (let point of points) {
		coordsList.push(point.x);
		coordsList.push(-1 * point.y);
	}
	return coordsList;
}

function ZonesDisplayLayer({
	scale,
	zones,
	x,
	y,
}: {
	scale: number;
	zones: Zone[];
	x: number;
	y: number;
}) {
	const rectSize = 32;

	return (
		<Layer scale={{ x: scale, y: scale }}>
			{zones.map((zone) => (
				<Line
					key={`zone-${zone.id}`}
					points={convertPointsToCoordsList(zone.points)}
					closed={true}
					x={x}
					y={y}
					stroke={"#007cc1BB"}
					fill={"#0ca2eb33"}
					strokeWidth={3}
				/>
			))}

			{zones.map((zone) =>
				zone.points.map((point, index) => (
					<Rect
						key={`${zone.id}-${index}`}
						width={rectSize}
						height={rectSize}
						fill={"#0166a3"}
						x={point.x + x - rectSize / 2}
						y={y - point.y - rectSize / 2}
					/>
				))
			)}
		</Layer>
	);
}

export default ZonesDisplayLayer;
