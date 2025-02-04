import { useState, useEffect } from "react";
import "./SpaghettiMapReport.css";
import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";
import "../../../components/common/Report.css";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { SynChangeEvent } from "@synergy-design-system/react/components/checkbox.js";
import SpaghettiMapDisplay from "./map/SpaghettiMapDisplay";
import { Facility } from "../../../entities/Facility";
import { AssetPositionHistoryLog } from "../../../entities/AssetPositionHistoryLog";
import { AssetPositionHistoryLogService } from "../../../services/AssetPositionHistoryLogService";
import { FacilityService } from "../../../services/FacilityService";
import { Asset } from "../../../entities/Asset";
import { AssetPositionHistoryLogFilter } from "../../../entities/AssetPositionHistoryLogFilter";

function SpaghettiMapReport() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );
  const [facilityAssets, setFacilityAssets] = useState<Asset[]>([]);
  const [timeSpan, setTimeSpan] = useState("lastMonth");
  const [displayedLogs, setDisplayedLogs] = useState<AssetPositionHistoryLog[]>(
    []
  );
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(
    dayjs().subtract(30, "days")
  );
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(dayjs());

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
    const loadAssets = async () => {
      if (!selectedFacility) return;
      setFacilityAssets(selectedFacility.containedAssets);
      setSelectedAsset(facilityAssets[0] || null);
    };

    loadAssets();
  }, [selectedFacility]);

  useEffect(() => {
    if (selectedFacility == null) {
      setSelectedAsset(null);
      return;
    }
    if (selectedFacility.containedAssets.length == 0) {
      setSelectedAsset(null);
      return;
    }
    setSelectedAsset(selectedFacility.containedAssets[0]);
  }, [selectedFacility]);

  const handleApply = async () => {
    if (!selectedFacility || !selectedAsset) return;

    const filter = new AssetPositionHistoryLogFilter(
      selectedAsset.id,
      selectedFacility.id,
      fromDate ? fromDate.toDate() : null,
      toDate ? toDate.toDate() : null
    );

    const logs = await AssetPositionHistoryLogService.GetLogs(filter);
    setDisplayedLogs(logs);
  };

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

  const resetInputs = () => {
    if (facilities.length > 0) {
      setSelectedFacility(facilities[0]);
    } else {
      setSelectedFacility(null);
      setSelectedAsset(null);
    }
    setTimeSpan("lastMonth");
    setToDate(dayjs());
    setFromDate(dayjs().subtract(30, "days"));
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
              <span className="input-label">Asset</span>
              <SynSelect
                onSynChange={(e) =>
                  setSelectedAsset(
                    facilityAssets.find(
                      (z) =>
                        e.target &&
                        z.id.toString() ===
                          (e.target as HTMLSelectElement).value
                    ) || null
                  )
                }
                value={selectedAsset?.id.toString() || ""}
                className={
                  !selectedAsset || facilityAssets.length === 0
                    ? "disabled-dropdown"
                    : ""
                }
              >
                {facilityAssets.length > 0 ? (
                  facilityAssets.map((asset) => (
                    <SynOption key={asset.id} value={asset.id.toString()}>
                      {asset.name}
                    </SynOption>
                  ))
                ) : (
                  <SynOption value="" disabled>
                    No assets in this facility
                  </SynOption>
                )}
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
                !selectedFacility || !selectedAsset
                  ? "disabled-button"
                  : "apply-SynButton"
              }
              disabled={!selectedFacility || !selectedAsset}
            >
              APPLY
            </SynButton>
          </div>
        </div>
      </div>
      <div className="report-column take-space content-border">
        <SpaghettiMapDisplay
          facility={selectedFacility}
          displayedLogs={displayedLogs}
        ></SpaghettiMapDisplay>
      </div>
    </div>
  );
}

export default SpaghettiMapReport;
