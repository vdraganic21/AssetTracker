import { BarChart, axisClasses } from "@mui/x-charts";
import BarData from "./BarData";

type DateBarGraphProps = {
	graphDataset: BarData[];
	yLabel: string;
};

export default function BarGraph({ graphDataset, yLabel }: DateBarGraphProps) {
	const dataset = graphDataset.map((point) => ({
		name: point.name,
		value: point.value,
	}));

	return (
		<BarChart
			height={475}
			barLabel="value"
			borderRadius={5}
			margin={{ left: 80, top: 32, right: 0, bottom: 32 }}
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
	);
}
