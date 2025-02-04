import { useState, useEffect } from "react";
import "./ZoneRetentionTimeReport.css";
import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";
import "../../../components/common/Report.css";
import DataComparisonReportWidget from "../../../components/common/DataComparisonReportWidget";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { SynChangeEvent } from "@synergy-design-system/react/components/checkbox.js";
import { Facility } from "../../../entities/Facility";
import { FacilityService } from "../../../services/FacilityService";
import { Zone } from "../../../entities/Zone";
import { AssetZoneHistoryLogService } from "../../../services/AssetZoneHistoryLogService";
import { AssetZoneHistoryLog } from "../../../entities/AssetZoneHistoryLog";
import { AssetZoneHistoryLogFilter } from "../../../entities/AssetZoneHistoryLogFilter";
import ZoneRetentionTimeManager from "./managers/ZoneRetentionTimeManager";
import { secondsToString } from "./managers/SecondsToStringConverter";
import DateLineGraph from "../../../components/common/graphs/DateLineGraph";
import DateValueGraphPoint from "../../../components/common/graphs/DateValueGraphPoint";
import BarGraph from "../../../components/common/graphs/BarGraph";
import BarData from "../../../components/common/graphs/BarData";

function ZoneRetentionTimeReport() {
	const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
		null
	);
	const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [selectedFacilityZones, setSelectedFacilityZones] = useState<Zone[]>(
		[]
	);
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [timeSpan, setTimeSpan] = useState("lastMonth");
	const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(
		dayjs().subtract(30, "days")
	);
	const [toDate, setToDate] = useState<dayjs.Dayjs | null>(dayjs());
	const [averageRetentionTime, setAverageRetentionTime] = useState(0);
	// const [totalRetentionTime, setTotalRetentionTime] = useState(0);
	const [filteredLogs, setFilteredLogs] = useState<AssetZoneHistoryLog[]>([]);
	const [maxRetentionTime, setMaxRetentionTime] = useState(0);
	const [minRetentionTime, setMinRetentionTime] = useState(0);
	const [lineGraphDataset, setLineGraphDataset] = useState<
		DateValueGraphPoint[]
	>([]);
	useEffect(() => {
		const fetchData = async () => {
			const loadedFacilities = await FacilityService.GetAll();

			setFacilities(loadedFacilities);
			if (!loadedFacilities[0]) {
				setSelectedFacility(null);
			}
			setSelectedFacility(loadedFacilities[0]);
		};

		fetchData();
	}, []);

	useEffect(() => {
		const loadZones = async () => {
			if (!selectedFacility) return;
			const facilityZones = selectedFacility.containedZones;
			setSelectedFacilityZones(facilityZones);
			setSelectedZone(facilityZones.length > 0 ? facilityZones[0] : null);
		};

		loadZones();
	}, [selectedFacility]);

	useEffect(() => {
		if (selectedFacility && selectedZone) {
			handleApply();
		}
	}, [selectedFacility, selectedZone, fromDate, toDate]);

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
			setToDate(dayjs());
			setFromDate(calculatedFrom);
		}
	}, [timeSpan]);

	const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setHours(value === "" ? NaN : Math.max(0, Math.min(999, Number(value))));
	};

	const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setMinutes(value === "" ? NaN : Math.max(0, Math.min(59, Number(value))));
	};

	const handleFocusHours = () => {
		if (hours === 0) setHours(NaN);
	};

	const handleFocusMinutes = () => {
		if (minutes === 0) setMinutes(NaN);
	};

	const resetInputs = () => {
		if (facilities.length > 0) {
			const facilityWithZones = facilities[0] as Facility & { zones?: Zone[] };
			setSelectedFacility(facilityWithZones);
			setSelectedFacilityZones(facilityWithZones.zones || []);
			setSelectedZone(
				facilityWithZones.zones?.length ? facilityWithZones.zones[0] : null
			);
			setAverageRetentionTime(0);
			setMaxRetentionTime(0);
			setMinRetentionTime(0);
		} else {
			setSelectedFacility(null);
			setSelectedZone(null);
		}
		setHours(0);
		setMinutes(0);
		setTimeSpan("lastMonth");
		setToDate(dayjs());
		setFromDate(dayjs().subtract(30, "days"));
	};

	const handleApply = async () => {
		if (!selectedFacility || !selectedZone) return;

		const filter = new AssetZoneHistoryLogFilter(
			selectedZone.id,
			null,
			null,
			null,
			fromDate ? fromDate.toDate() : null,
			toDate ? toDate.toDate() : null,
			null,
			null
		);

		const logs = await AssetZoneHistoryLogService.GetLogs(filter); // ?

		if (!logs || logs.length === 0) {
			setFilteredLogs([]);
			processLogsStats([]);
			return;
		}

		setFilteredLogs(logs);
		fillDataElements();
	};

	const fillDataElements = async () => {
		if (!selectedFacility || !selectedZone) return;

		const filter = new AssetZoneHistoryLogFilter(
			selectedZone.id,
			null,
			null,
			null,
			dayjs().subtract(30, "days").toDate(),
			dayjs().toDate(),
			null,
			null
		);

		const logs = await AssetZoneHistoryLogService.GetLogs(filter); // ?

		processLogsStats(logs);
		processLastMonthLineGraph(logs);
	};

	const processLastMonthLineGraph = (logs: AssetZoneHistoryLog[]) => {
		const now = new Date();
		const dailyRetentionMap = new Map<string, number>();

		for (let i = 0; i < 30; i++) {
			const date = new Date();
			date.setDate(now.getDate() - i);
			const dateKey = date.toISOString().split("T")[0];
			dailyRetentionMap.set(dateKey, 0);
		}

		logs.forEach((log) => {
			const dateKey = new Date(log.exitDateTime).toISOString().split("T")[0];
			if (dailyRetentionMap.has(dateKey)) {
				dailyRetentionMap.set(
					dateKey,
					(dailyRetentionMap.get(dateKey) || 0) + log.retentionTime
				);
			}
		});

		const dataset = Array.from(dailyRetentionMap.entries()).map(
			([date, value]) =>
				new DateValueGraphPoint(Math.floor(value / 60), new Date(date))
		);

		setLineGraphDataset(dataset);
	};

	const processLogsStats = (logs: AssetZoneHistoryLog[]) => {
		if (logs.length === 0) {
			setAverageRetentionTime(0);
			setMaxRetentionTime(0);
			setMinRetentionTime(0);
			return;
		}

		let retentionManager = new ZoneRetentionTimeManager(logs);

		const avgRetention = retentionManager.getAvgRetentionTime();
		const maxRetention = retentionManager.getMaxRetentionTime();
		const minRetention = retentionManager.getMinRetentionTime();

		setAverageRetentionTime(avgRetention);
		setMaxRetentionTime(maxRetention);
		setMinRetentionTime(minRetention);
	};

	return (
		<div className="report-row report-padding">
			<div className="report-column">
				<div className="retention-panel content-border">
					<div>
						<p className="panel-title">Retention Report</p>
						<div className="input-group">
							<span className="input-label">Facility</span>
							<SynSelect
								onSynChange={(e) =>
									setSelectedFacility(
										facilities.find(
											(f) =>
												f.id.toString() ===
												(e.target as HTMLSelectElement).value
										) || null
									)
								}
								value={selectedFacility?.id.toString() || ""}
								className={facilities.length === 0 ? "disabled-dropdown" : ""}
							>
								{facilities.length > 0 ? (
									facilities.map((facility) => (
										<SynOption key={facility.id} value={facility.id.toString()}>
											{facility.name}
										</SynOption>
									))
								) : (
									<SynOption value="" disabled>
										No facilities available
									</SynOption>
								)}
							</SynSelect>
						</div>
						<div className="input-group">
							<span className="input-label">Zone</span>
							<SynSelect
								onSynChange={(e) =>
									setSelectedZone(
										selectedFacilityZones.find(
											(z) =>
												e.target &&
												z.id.toString() ===
													(e.target as HTMLSelectElement).value
										) || null
									)
								}
								value={selectedZone?.id.toString() || ""}
								className={
									selectedFacilityZones.length === 0 ? "disabled-dropdown" : ""
								}
							>
								{selectedFacilityZones.length > 0 ? (
									selectedFacilityZones.map((zone) => (
										<SynOption key={zone.id} value={zone.id.toString()}>
											{zone.name}
										</SynOption>
									))
								) : (
									<SynOption value="" disabled>
										No zones in this facility
									</SynOption>
								)}
							</SynSelect>
						</div>
						<div className="input-group">
							<span className="input-label">Retention Threshold</span>
							<div className="picker-row">
								<div className="number-input">
									<span className="number-input-label">Hours:</span>
									<input
										type="number"
										min="0"
										max="999"
										value={hours}
										onFocus={handleFocusHours}
										onChange={handleHoursChange}
									/>
								</div>
								<div className="number-input">
									<span className="number-input-label">Minutes:</span>
									<input
										type="number"
										min="0"
										max="59"
										value={minutes}
										onFocus={handleFocusMinutes}
										onChange={(e) => handleMinutesChange(e)}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="input-group">
						<span className="input-label">Time Span</span>
						<SynSelect
							value={timeSpan}
							onSynChange={(e: SynChangeEvent) => {
								setTimeSpan((e.target as HTMLInputElement).value);
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
									value={fromDate}
									onChange={(newValue) => {
										if (newValue) {
											setFromDate(newValue);
											setTimeSpan("custom");
											if (toDate && newValue.isAfter(toDate)) {
												setToDate(newValue);
											}
										}
									}}
									format="DD/MM/YYYY HH:mm"
									maxDate={toDate || dayjs()}
									slotProps={{
										textField: { className: "date-picker-input" },
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
									value={toDate}
									onChange={(newValue) => {
										if (newValue) {
											setToDate(newValue);
											setTimeSpan("custom");
											if (fromDate && newValue.isBefore(fromDate)) {
												setFromDate(newValue);
											}
										}
									}}
									format="DD/MM/YYYY HH:mm"
									minDate={fromDate || undefined}
									maxDate={dayjs()}
									slotProps={{
										textField: { className: "date-picker-input" },
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
							onClick={handleApply}
							className={
								!selectedFacility || !selectedZone
									? "disabled-button"
									: "apply-SynButton"
							}
							disabled={!selectedFacility || !selectedZone}
						>
							APPLY
						</SynButton>
					</div>
				</div>
			</div>
			<div className="report-column take-space">
				<div className="report-row">
					<DataComparisonReportWidget
						mainData={secondsToString(averageRetentionTime)}
						mainDescription="Average retention time last 24h"
						secondaryDataLeft={secondsToString(averageRetentionTime)}
						secondaryDescriptionLeft="Last week"
						secondaryDataRight={secondsToString(averageRetentionTime)}
						secondaryDescriptionRight="Last month"
					/>
					<DataComparisonReportWidget
						mainData={secondsToString(maxRetentionTime)}
						mainDescription="Maximum retention time last 24h"
						secondaryDataLeft={secondsToString(maxRetentionTime)}
						secondaryDescriptionLeft="Last week"
						secondaryDataRight={secondsToString(maxRetentionTime)}
						secondaryDescriptionRight="Last month"
					/>
					<DataComparisonReportWidget
						mainData={secondsToString(minRetentionTime)}
						mainDescription="Minimum retention time last 24h"
						secondaryDataLeft={secondsToString(minRetentionTime)}
						secondaryDescriptionLeft="Last week"
						secondaryDataRight={secondsToString(minRetentionTime)}
						secondaryDescriptionRight="Last month"
					/>
				</div>
				<div className="report-row take-space">
					<div className="content-border take-space">
						<DateLineGraph
							yLabel="Retention time / minutes"
							graphDataset={lineGraphDataset}
						/>
					</div>
					<div className="content-border take-space">
						<BarGraph yLabel="Retention time / minutes" graphDataset={[]} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ZoneRetentionTimeReport;
