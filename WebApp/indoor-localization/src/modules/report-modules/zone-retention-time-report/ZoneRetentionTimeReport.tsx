import { useState, useEffect } from "react";
import "./ZoneRetentionTimeReport.css";
import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";
import "../../../components/common/Report.css";
import DataComparisonReportWidget from "../../../components/common/DataComparisonReportWidget";
import ReportExportButtonGroup from "../../../components/common/ReportExportButtonGroup";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { SynChangeEvent } from "@synergy-design-system/react/components/checkbox.js";
import { Facility } from "../../../entities/Facility";
import { FacilityService } from "../../../services/FacilityService";
import { ZoneService } from "../../../services/ZoneService";
import { Zone } from "../../../entities/Zone";

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

  useEffect(() => {
    let isInitialized = false;

    const fetchData = async () => {
      if (isInitialized) return;

      const loadedFacilities = await FacilityService.GetAll();
      const uniqueFacilities = Array.from(
        new Map(loadedFacilities.map((f) => [f.id, f])).values()
      );
      setFacilities(uniqueFacilities);

      if (uniqueFacilities.length > 0) {
        setSelectedFacility(uniqueFacilities[0]);
      }

      isInitialized = true;
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loadZones = async () => {
      if (!selectedFacility) return;

      const loadedZones = await ZoneService.GetAll();
      const facilityZones = Array.from(
        new Map(
          loadedZones
            .filter((zone) => zone.parentFacilityId === selectedFacility.id)
            .map((z) => [z.id, z])
        ).values()
      );
      setSelectedFacilityZones(facilityZones);
      setSelectedZone(facilityZones.length > 0 ? facilityZones[0] : null);
    };

    loadZones();
  }, [selectedFacility]);

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
                  label="From"
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
                  label="To"
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
              onClick={() => {
                if (selectedFacility && selectedZone) {
                  console.log("Apply button clicked.");
                }
              }}
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
