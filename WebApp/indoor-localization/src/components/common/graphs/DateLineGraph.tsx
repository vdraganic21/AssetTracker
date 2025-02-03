import { axisClasses, LineChart } from "@mui/x-charts";
import DateValueGraphPoint from "./DateValueGraphPoint";

type DateLineGraphProps = {
	graphDataset: DateValueGraphPoint[];
	yLabel: string;
};

export default function DateLineGraph({
	graphDataset,
	yLabel,
}: DateLineGraphProps) {
	const dataset = graphDataset.map((point) => ({
		date: point.date,
		value: point.value,
	}));

	return (
		<div className="graph-div">
			<LineChart
				margin={{ left: 80 }}
				xAxis={[{ scaleType: "time", dataKey: "date", stroke: "red" }]}
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
