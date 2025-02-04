import { Circle, Layer, Line } from "react-konva";
import { AssetPositionHistoryLog } from "../../../../entities/AssetPositionHistoryLog";

export default function SpaghettiMapLinesLayer({
	logs,
	scale,
	x,
	y,
}: {
	logs: AssetPositionHistoryLog[];
	scale: { x: number; y: number };
	x: number;
	y: number;
}) {
	let points: number[] = [];
	for (let log of logs) {
		if (
			log.position &&
			log.position.x !== undefined &&
			log.position.y !== undefined
		) {
			points.push(log.position.x + x);
			points.push(y - log.position.y);
		}
	}

	return (
		<Layer scale={scale}>
			<Line points={points} stroke={"#ea0823"} strokeWidth={4} />
			{logs.map((log, index) => {
				if (
					log.position &&
					log.position.x !== undefined &&
					log.position.y !== undefined
				) {
					return (
						<Circle
							key={index}
							x={log.position.x + x}
							y={y - log.position.y}
							radius={6}
							fill="#ea0823"
						/>
					);
				}
			})}
		</Layer>
	);
}
