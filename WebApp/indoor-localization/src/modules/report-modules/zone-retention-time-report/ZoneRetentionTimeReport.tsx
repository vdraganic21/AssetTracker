import { useState } from "react";
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
import TimePicker from "../../../components/common/TimePicker";

function ZoneRetentionTimeReport() {
  const [facility, setFacility] = useState("");
  const [zone, setZone] = useState("");
  const [threshold, setThreshold] = useState("00:00");
  const [timeSpan, setTimeSpan] = useState("custom");
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

  const generateDigitOptions = (max: number, step: number = 1): string[] => {
    const options: string[] = [];
    for (let i = 0; i <= max; i += step) {
      options.push(i.toString().padStart(2, "0"));
    }
    return options;
  };

  interface ThresholdChangeParams {
    value: string;
    isHour: boolean;
  }

  const handleThresholdChange = ({ value, isHour }: ThresholdChangeParams) => {
    const currentTime = threshold.split(":");
    const newTime = isHour
      ? `${value}:${currentTime[1]}`
      : `${currentTime[0]}:${value}`;
    setThreshold(newTime);
  };

  const resetInputs = () => {
    setFacility("");
    setZone("");
    setThreshold("00:00");
    setTimeSpan("custom");
    setCustomRange({
      from: null,
      fromTime: "00:00",
      to: null,
      toTime: "00:00",
    });
  };

  const hourOptions = generateDigitOptions(23);
  const minuteOptions = generateDigitOptions(59, 5);

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
                <SynOption value="">Select a Facility</SynOption>{" "}
                <SynOption value="Facility 1">Facility 1</SynOption>
                <SynOption value="Facility 2">Facility 2</SynOption>
                <SynOption value="Facility 3">Facility 3</SynOption>{" "}
              </SynSelect>
            </div>
            <div className="input-group">
              <span className="input-label">Zone</span>
              <SynSelect
                value={zone}
                onChange={(e) => setZone((e.target as HTMLSelectElement).value)}
                className="sort-select"
              >
                <SynOption value="">Select a Zone</SynOption>{" "}
                <SynOption value="Zone 1">Zone 1</SynOption>
                <SynOption value="Zone 2">Zone 2</SynOption>
                <SynOption value="Zone 3">Zone 3</SynOption>{" "}
              </SynSelect>
            </div>
            <div className="input-group">
              <span className="input-label">Retention Threshold</span>
              <div>picker module here</div>
            </div>
          </div>
          <div>
            <SynDivider className="content-divider"></SynDivider>
          </div>
          <div className="input-group">
            <span className="input-label">Time Span</span>
            <SynSelect
              value={timeSpan}
              onChange={(e) =>
                setTimeSpan((e.target as HTMLSelectElement).value)
              }
              className="sort-select"
            >
              <SynOption value="lastDay">Last Day</SynOption>
              <SynOption value="lastWeek">Last Week</SynOption>
              <SynOption value="lastMonth">Last Month</SynOption>
              <SynOption value="custom">Custom</SynOption>
            </SynSelect>
            <span className="input-label">From</span>
            <div className="picker-row">
              <div>picker module here</div>
            </div>
            <span className="input-label">To</span>
            <div className="picker-row">
              <div>picker module here</div>
              <div className="date-picker"></div>
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
