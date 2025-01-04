import { useState } from "react";
import DatePicker from "react-datepicker";
import { Container, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./ZoneRetentionTimeReport.css";
import { SynButton, SynOption, SynSelect } from "@synergy-design-system/react";

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

  const generateDigitOptions = (max: number): string[] => {
    const options: string[] = [];
    for (let i = 0; i <= max; i++) {
      options.push(i.toString().padStart(2, "0"));
    }
    return options;
  };

  interface CustomTimeChangeParams {
    value: string;
    isFrom: boolean;
    isHour: boolean;
  }

  const handleCustomTimeChange = ({
    value,
    isFrom,
    isHour,
  }: CustomTimeChangeParams) => {
    const key = isFrom ? "fromTime" : "toTime";
    const currentTime = customRange[key].split(":");
    const newTime = isHour
      ? `${value}:${currentTime[1]}`
      : `${currentTime[0]}:${value}`;

    setCustomRange({ ...customRange, [key]: newTime });
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
  const minuteOptions = generateDigitOptions(59);

  return (
    <Container fluid="true">
      <Row>
        <Col md="auto">
          <Container>
            <Row>
              <Container fluid="true">
                <div className="retention-panel">
                  <span className="panel-title">Retention Report</span>
                  <div className="input-group">
                    <span className="input-label">Facility</span>
                    <SynSelect value={"option1"} className="sort-select">
                      <SynOption value={"Facility 1"}>{"Facility1"}</SynOption>
                    </SynSelect>
                  </div>
                  <div className="input-group">
                    <span className="input-label">Zone</span>
                    <SynSelect value={"option1"} className="sort-select">
                      <SynOption value={"Facility 1"}>{"Facility1"}</SynOption>
                    </SynSelect>
                  </div>
                  <div className="input-group">
                    <span className="input-label">Retention Threshold</span>
                    <div className="picker-row">
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                      :
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                    </div>
                  </div>
                  <div className="time-span-container">
                    <div className="input-group">
                      <span className="input-label">Time Span</span>
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                    </div>
                    <span className="input-label">From</span>
                    <div className="picker-row">
                      <DatePicker
                        selected={customRange.from}
                        onChange={(date) =>
                          setCustomRange({ ...customRange, from: date })
                        }
                        placeholderText="Select Date"
                        className="date-picker"
                      />
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                      :
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                    </div>
                    <span className="input-label">To</span>
                    <div className="picker-row">
                      <DatePicker
                        selected={customRange.to}
                        onChange={(date) =>
                          setCustomRange({ ...customRange, to: date })
                        }
                        placeholderText="Select Date"
                        className="date-picker"
                      />
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                      :
                      <SynSelect value={"option1"} className="sort-select">
                        <SynOption value={"Facility 1"}>
                          {"Facility1"}
                        </SynOption>
                      </SynSelect>
                    </div>
                  </div>
                  <div className="SynButton-group">
                    <SynButton
                      onClick={resetInputs}
                      className="reset-SynButton"
                    >
                      RESET
                    </SynButton>
                    <SynButton
                      onClick={() => console.log("Apply SynButton clicked.")}
                      className="apply-SynButton"
                    >
                      APPLY
                    </SynButton>
                  </div>
                </div>
              </Container>
            </Row>
            <Row>
              <Container fluid="true">Empty export</Container>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container fluid="true">
            <Row>
              <Col>
                <Container fluid="true">
                  <div className="content-border">blah</div>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <div className="content-border">blah</div>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <div className="content-border">blah</div>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <div className="content-border">blah</div>
                </Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container fluid="true">
                  <div className="content-border">Blah</div>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <div className="content-border">Blah</div>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ZoneRetentionTimeReport;
