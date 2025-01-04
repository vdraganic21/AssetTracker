import { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import DatePicker from "react-datepicker";
import { Container, Row, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import "./ZoneRetentionTimeReport.css";

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
                  <Typography variant="h6" className="panel-title">
                    Retention Report
                  </Typography>
                  <div className="input-group">
                    <Typography variant="subtitle1" className="input-label">
                      Facility
                    </Typography>
                    <TextField
                      select
                      label="Select Facility"
                      value={facility}
                      onChange={(e) => setFacility(e.target.value)}
                      fullWidth
                      className="facility-dropdown"
                    >
                      <MenuItem value="">Select Facility</MenuItem>
                      <MenuItem value="Facility 1">Facility 1</MenuItem>
                      <MenuItem value="Facility 2">Facility 2</MenuItem>
                    </TextField>
                  </div>
                  <div className="input-group">
                    <Typography variant="subtitle1" className="input-label">
                      Zone
                    </Typography>
                    <TextField
                      select
                      label="Select Zone"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                      fullWidth
                      className="zone-dropdown"
                    >
                      <MenuItem value="">Select Zone</MenuItem>
                      <MenuItem value="Zone 1">Zone 1</MenuItem>
                      <MenuItem value="Zone 2">Zone 2</MenuItem>
                    </TextField>
                  </div>
                  <div className="input-group">
                    <Typography variant="subtitle1" className="input-label">
                      Retention Threshold
                    </Typography>
                    <div className="picker-row">
                      <TextField
                        select
                        value={threshold.split(":")[0]}
                        onChange={(e) =>
                          handleThresholdChange({
                            value: e.target.value,
                            isHour: true,
                          })
                        }
                        className="time-picker"
                      >
                        {hourOptions.map((hour) => (
                          <MenuItem key={hour} value={hour}>
                            {hour}
                          </MenuItem>
                        ))}
                      </TextField>
                      :
                      <TextField
                        select
                        value={threshold.split(":")[1]}
                        onChange={(e) =>
                          handleThresholdChange({
                            value: e.target.value,
                            isHour: false,
                          })
                        }
                        className="time-picker"
                      >
                        {minuteOptions.map((minute) => (
                          <MenuItem key={minute} value={minute}>
                            {minute}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="time-span-container">
                    <div className="input-group">
                      <Typography variant="subtitle1" className="input-label">
                        Time Span
                      </Typography>
                      <TextField
                        select
                        value={timeSpan}
                        onChange={(e) => setTimeSpan(e.target.value)}
                        fullWidth
                        className="time-span-dropdown"
                      >
                        <MenuItem value="custom">Custom</MenuItem>
                        <MenuItem value="last day">Last Day</MenuItem>
                        <MenuItem value="last week">Last Week</MenuItem>
                        <MenuItem value="last month">Last Month</MenuItem>
                      </TextField>
                    </div>
                    <Typography variant="subtitle1" className="input-label">
                      From
                    </Typography>
                    <div className="picker-row">
                      <DatePicker
                        selected={customRange.from}
                        onChange={(date) =>
                          setCustomRange({ ...customRange, from: date })
                        }
                        placeholderText="Select Date"
                        className="date-picker"
                      />
                      <TextField
                        select
                        value={customRange.fromTime.split(":")[0]}
                        onChange={(e) =>
                          handleCustomTimeChange({
                            value: e.target.value,
                            isFrom: true,
                            isHour: true,
                          })
                        }
                        className="time-picker"
                      >
                        {hourOptions.map((hour) => (
                          <MenuItem key={hour} value={hour}>
                            {hour}
                          </MenuItem>
                        ))}
                      </TextField>
                      :
                      <TextField
                        select
                        value={customRange.fromTime.split(":")[1]}
                        onChange={(e) =>
                          handleCustomTimeChange({
                            value: e.target.value,
                            isFrom: true,
                            isHour: false,
                          })
                        }
                        className="time-picker"
                      >
                        {minuteOptions.map((minute) => (
                          <MenuItem key={minute} value={minute}>
                            {minute}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <Typography variant="subtitle1" className="input-label">
                      To
                    </Typography>
                    <div className="picker-row">
                      <DatePicker
                        selected={customRange.to}
                        onChange={(date) =>
                          setCustomRange({ ...customRange, to: date })
                        }
                        placeholderText="Select Date"
                        className="date-picker"
                      />
                      <TextField
                        select
                        value={customRange.toTime.split(":")[0]}
                        onChange={(e) =>
                          handleCustomTimeChange({
                            value: e.target.value,
                            isFrom: false,
                            isHour: true,
                          })
                        }
                        className="time-picker"
                      >
                        {hourOptions.map((hour) => (
                          <MenuItem key={hour} value={hour}>
                            {hour}
                          </MenuItem>
                        ))}
                      </TextField>
                      :
                      <TextField
                        select
                        value={customRange.toTime.split(":")[1]}
                        onChange={(e) =>
                          handleCustomTimeChange({
                            value: e.target.value,
                            isFrom: false,
                            isHour: false,
                          })
                        }
                        className="time-picker"
                      >
                        {minuteOptions.map((minute) => (
                          <MenuItem key={minute} value={minute}>
                            {minute}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="button-group">
                    <Button
                      variant="contained"
                      onClick={resetInputs}
                      className="reset-button"
                    >
                      RESET
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => console.log("Apply button clicked.")}
                      className="apply-button"
                    >
                      APPLY
                    </Button>
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
                  <Card variant="outlined">
                    <CardHeader title="Average Retention Time" />
                    <CardContent>
                      <Typography variant="h6" className="card-value">
                        00:00
                      </Typography>
                    </CardContent>
                  </Card>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <Card variant="outlined">
                    <CardHeader title="Max Retention Time" />
                    <CardContent>
                      <Typography variant="h6" className="card-value">
                        00:00
                      </Typography>
                    </CardContent>
                  </Card>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <Card variant="outlined">
                    <CardHeader title="Min Retention Time" />
                    <CardContent>
                      <Typography variant="h6" className="card-value">
                        00:00
                      </Typography>
                    </CardContent>
                  </Card>
                </Container>
              </Col>
              <Col>
                <Container fluid="true">
                  <Card variant="outlined">
                    <CardHeader title="Assets by retention time" />
                    <CardContent>
                      <Typography variant="h6" className="card-value">
                        00:00
                      </Typography>
                    </CardContent>
                  </Card>
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
