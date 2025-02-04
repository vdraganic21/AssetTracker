import { useState, useEffect } from "react";
import "./SpaghettiMapReport.css";
import {
	SynButton,
	SynDivider,
	SynOption,
	SynSelect,
} from "@synergy-design-system/react";
import "../../../components/common/Report.css";
import ReportExportButtonGroup from "../../../components/common/ReportExportButtonGroup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { SynChangeEvent } from "@synergy-design-system/react/components/checkbox.js";
import SpaghettiMapDisplay from "./map/SpaghettiMapDisplay";
import { Facility } from "../../../entities/Facility";
import { AssetPositionHistoryLog } from "../../../entities/AssetPositionHistoryLog";
import { Point } from "../../../entities/Point";

function SpaghettiMapReport() {
	const [facility, setFacility] = useState("");
	const [zone, setZone] = useState("");
	const [minutes, setMinutes] = useState(0);
	const [timeSpan, setTimeSpan] = useState("lastMonth");
	const [customRange, setCustomRange] = useState<{
		from: Date | null;
		fromTime: string;
		to: Date | null;
		toTime: string;
	}>({
		from: null,
		fromTime: "00:00",
		to: null,
		toTime: "00:00",
	});
	const [displayedLogs, setDisplayedLogs] = useState<AssetPositionHistoryLog[]>(
		[]
	);

	useEffect(() => {
		setDisplayedLogs([
			new AssetPositionHistoryLog(1, 1, 1, new Point(100, 100), new Date()),
			new AssetPositionHistoryLog(1, 1, 1, new Point(100, 200), new Date()),
			new AssetPositionHistoryLog(1, 1, 1, new Point(200, 200), new Date()),
			new AssetPositionHistoryLog(1, 1, 1, new Point(333, 333), new Date()),
		]);
	}, []);

	useEffect(() => {
		if (timeSpan !== "custom") {
			const now = dayjs();
			let calculatedFrom;

			switch (timeSpan) {
				case "lastDay":
					calculatedFrom = now.subtract(1, "days");
					break;
				case "lastWeek":
					calculatedFrom = now.subtract(7, "days");
					break;
				case "lastMonth":
					calculatedFrom = now.subtract(30, "days");
					break;
				default:
					calculatedFrom = now.subtract(30, "days");
			}

			setCustomRange({
				from: calculatedFrom.toDate(),
				fromTime: calculatedFrom.format("HH:mm"),
				to: now.toDate(),
				toTime: now.format("HH:mm"),
			});
		}
	}, [timeSpan]);

	const handleFocusMinutes = () => {
		if (minutes === 0) setMinutes(NaN);
	};

	const resetInputs = () => {
		setFacility("");
		setZone("");
		setTimeSpan("lastMonth");
		const now = dayjs();
		const calculatedFrom = now.subtract(30, "days");
		setCustomRange({
			from: calculatedFrom.toDate(),
			fromTime: calculatedFrom.format("HH:mm"),
			to: now.toDate(),
			toTime: now.format("HH:mm"),
		});
	};

	return (
		<div className="report-row report-padding take-space">
			<div className="report-column">
				<div className="retention-panel content-border take-space">
					<div>
						<p className="panel-title">Spaghetti Map Report</p>
						<div className="input-group">
							<span className="input-label">Facility</span>
							<SynSelect
								value={facility}
								onChange={(e) =>
									setFacility((e.target as HTMLSelectElement).value)
								}
								className="sort-select"
							>
								<SynOption value="">Select a Facility</SynOption>
								<SynOption value="Facility_1">Facility 1</SynOption>
								<SynOption value="Facility_2">Facility 2</SynOption>
								<SynOption value="Facility_3">Facility 3</SynOption>
							</SynSelect>
						</div>
						<div className="input-group">
							<span className="input-label">Asset</span>
							<SynSelect
								value={zone}
								onChange={(e) => setZone((e.target as HTMLSelectElement).value)}
								className="sort-select"
							>
								<SynOption value="">Select an Asset</SynOption>
								<SynOption value="Zone_1">Asset 1</SynOption>
								<SynOption value="Zone_2">Asset 2</SynOption>
								<SynOption value="Zone_3">Asset 3</SynOption>
							</SynSelect>
						</div>
						<div className="input-group">
							<div className="picker-row"></div>
						</div>
					</div>
					<div className="input-group">
						<span className="input-label">Time Span</span>
						<SynSelect
							value={timeSpan}
							onSynChange={(e: SynChangeEvent) => {
								setTimeSpan((e.target as HTMLInputElement).value);
								console.log((e.target as HTMLInputElement).value);
							}}
							className="sort-select"
						>
							<SynOption value="lastDay">Last Day</SynOption>
							<SynOption value="lastWeek">Last Week</SynOption>
							<SynOption value="lastMonth">Last Month</SynOption>
							<SynOption value="custom">Custom</SynOption>
						</SynSelect>
						<span className="input-label">From</span>
						<div className="picker-row">
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale={navigator.language}
							>
								<DateTimePicker
									className="date-picker"
									label="Select Date & Time"
									ampm={false}
									value={customRange.from ? dayjs(customRange.from) : null}
									onChange={(newValue) => {
										setCustomRange({
											...customRange,
											from: newValue?.toDate() || null,
										});
										setTimeSpan("custom");
									}}
									format="DD/MM/YYYY HH:mm"
									slotProps={{
										textField: {
											className: "date-picker-input",
										},
									}}
								/>
							</LocalizationProvider>
						</div>
						<span className="input-label">To</span>
						<div className="picker-row">
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								adapterLocale={navigator.language}
							>
								<DateTimePicker
									className="date-picker"
									label="Select Date & Time"
									ampm={false}
									value={customRange.to ? dayjs(customRange.to) : null}
									onChange={(newValue) => {
										setCustomRange({
											...customRange,
											to: newValue?.toDate() || null,
										});
										setTimeSpan("custom");
									}}
									format="DD/MM/YYYY HH:mm"
									slotProps={{
										textField: {
											className: "date-picker-input",
										},
									}}
								/>
							</LocalizationProvider>
						</div>
					</div>
					<div className="button-group">
						<SynButton
							variant="filled"
							onClick={resetInputs}
							className="reset-SynButton"
						>
							RESET
						</SynButton>
						<SynButton
							variant="filled"
							onClick={() => console.log("Apply SynButton clicked.")}
							className="apply-SynButton"
						>
							APPLY
						</SynButton>
					</div>
				</div>
			</div>
			<div className="report-column take-space content-border">
				<SpaghettiMapDisplay
					facility={new Facility(1, "Facility 1", "/floorMapDemo.png", [], [])}
					displayedLogs={displayedLogs}
				></SpaghettiMapDisplay>
			</div>
		</div>
	);
}

export default SpaghettiMapReport;
