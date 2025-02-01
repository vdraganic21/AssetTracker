import { useState, useEffect } from "react";
import "./ZoneRetentionTimeReport.css";
import {
  SynButton,
  SynDivider,
  SynOption,
  SynSelect,
} from "@synergy-design-system/react";
import "../../../components/common/Report.css";
import DataComparisonReportWidget from "../../../components/common/DataComparisonReportWidget";
import ReportExportButtonGroup from "../../../components/common/ReportExportButtonGroup";
import SummaryList from "../../../components/common/SummaryList";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { SynChangeEvent } from "@synergy-design-system/react/components/checkbox.js";

function ZoneRetentionTimeReport() {
  const [facility, setFacility] = useState("");
  const [zone, setZone] = useState("");
  const [hours, setHours] = useState(0);
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
    setFacility("");
    setZone("");
    setHours(0);
    setMinutes(0);
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

  const summaryData = [
    { note: "Zone 1 has the highest activity level (24 hrs)", icon: "🔥" },
    { note: "Zone 4 has the lowest activity level (2 hrs)", icon: "❄️" },
    { note: "Zone 5 has no recorded activity", icon: "⚠️" },
    { note: "Zone 1 has the highest activity level (24 hrs)", icon: "🔥" },
    { note: "Zone 4 has the lowest activity level (2 hrs)", icon: "❄️" },
    { note: "Zone 5 has no recorded activity", icon: "⚠️" },
    { note: "Zone 1 has the highest activity level (24 hrs)", icon: "🔥" },
    { note: "Zone 4 has the lowest activity level (2 hrs)", icon: "❄️" },
    { note: "Zone 5 has no recorded activity", icon: "⚠️" },
    { note: "Zone 1 has the highest activity level (24 hrs)", icon: "🔥" },
    { note: "Zone 4 has the lowest activity level (2 hrs)", icon: "❄️" },
    { note: "Zone 5 has no recorded activity", icon: "⚠️" },
    { note: "Zone 1 has the highest activity level (24 hrs)", icon: "🔥" },
    { note: "Zone 4 has the lowest activity level (2 hrs)", icon: "❄️" },
    { note: "Zone 5 has no recorded activity", icon: "⚠️" },
  ];

  return (
    <div className="report-row report-padding">
      <div className="report-column">
        <div className="retention-panel content-border">
          <div>
            <p className="panel-title">Retention Report</p>
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
              <span className="input-label">Zone</span>
              <SynSelect
                value={zone}
                onChange={(e) => setZone((e.target as HTMLSelectElement).value)}
                className="sort-select"
              >
                <SynOption value="">Select a Zone</SynOption>
                <SynOption value="Zone_1">Zone 1</SynOption>
                <SynOption value="Zone_2">Zone 2</SynOption>
                <SynOption value="Zone_3">Zone 3</SynOption>
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
                    onFocus={handleMinutesChange}
                    onChange={(e) => handleMinutesChange(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <SynDivider className="content-divider"></SynDivider>
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
        <div className="content-border take-space">
          <SummaryList summaryItems={summaryData} />
        </div>
        <div className="zone-export-buttons content-border">
          <ReportExportButtonGroup />
        </div>
      </div>
      <div className="report-column take-space">
        <div className="report-row">
          <DataComparisonReportWidget
            mainData="17min"
            mainDescription="Viljuškar idle time last 24h"
            secondaryDataLeft="15min"
            secondaryDescriptionLeft="Last week"
            secondaryDataRight="16min"
            secondaryDescriptionRight="Last month"
          />
          <DataComparisonReportWidget
            mainData="12h 15min"
            mainDescription="Viljuškar idle time last 24h"
            secondaryDataLeft="15min"
            secondaryDescriptionLeft="Last week"
            secondaryDataRight="16min"
            secondaryDescriptionRight="Last month"
          />
          <DataComparisonReportWidget
            mainData="17min"
            mainDescription="Viljuškar idle time last 24h"
            secondaryDataLeft="12h 15min"
            secondaryDescriptionLeft="Last week"
            secondaryDataRight="16min"
            secondaryDescriptionRight="Last month"
          />
          <DataComparisonReportWidget
            mainData="17min"
            mainDescription="Viljuškar idle time last 24h"
            secondaryDataLeft="15min"
            secondaryDescriptionLeft="Last week"
            secondaryDataRight="16min"
            secondaryDescriptionRight="Last month"
          />
        </div>
        <div className="report-row take-space">
          <div className="content-border take-space">blah</div>
          <div className="content-border take-space">blah</div>
        </div>
      </div>
    </div>
  );
}

export default ZoneRetentionTimeReport;
