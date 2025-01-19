import { Layer, Line, Rect, Text } from "react-konva";
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

function calculateCentroid(points: Point[]): Point {
	const n = points.length;
	let centroidX = 0;
	let centroidY = 0;

	for (let point of points) {
		centroidX += point.x;
		centroidY += point.y;
	}

	return {
		x: centroidX / n,
		y: centroidY / n,
	};
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
	const rectSize = 16;

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
						width={rectSize / scale}
						height={rectSize / scale}
						fill={"#0166a3"}
						x={point.x + x - rectSize / scale / 2}
						y={y - point.y - rectSize / scale / 2}
					/>
				))
			)}

			{zones.map((zone) => {
				const centroid = calculateCentroid(zone.points);
				return (
					<Text
						key={`zone-name-${zone.id}`}
						text={zone.name}
						x={centroid.x + x}
						y={y - centroid.y}
						fontSize={16 / scale}
						fill={"#072E4ACC"}
						align="center"
						verticalAlign="middle"
						offsetX={zone.name.length * 8}
					/>
				);
			})}
		</Layer>
	);
}

export default ZonesDisplayLayer;
