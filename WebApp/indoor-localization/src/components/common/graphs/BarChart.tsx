import { BarChart, axisClasses } from "@mui/x-charts";
import BarData from "./BarData";

type DateBarGraphProps = {
	graphDataset: BarData[];
	yLabel: string;
};

export default function DateBarGraph({
	graphDataset,
	yLabel,
}: DateBarGraphProps) {
	const dataset = graphDataset.map((point) => ({
		name: point.name,
		value: point.value,
	}));

	return (
		<div className="graph-div">
			<BarChart
				borderRadius={5}
				margin={{ left: 80 }}
				xAxis={[{ dataKey: "name", stroke: "red", scaleType: "band" }]}
				yAxis={[
					{
						dataKey: "value",
						stroke: "gray",
						label: yLabel,
					},
				]}
				series={[
					{
						dataKey: "value",
						color: "#0ca2eb",
					},
				]}
				dataset={dataset}
				sx={{
					[`.${axisClasses.left} .${axisClasses.label}`]: {
						transform: "translate(-20px, 0)",
					},
				}}
			/>
		</div>
	);
}
