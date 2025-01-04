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
    <Container>
      <Row>
        <Col>
          <Container>
            <Row>
              <Container className="content-border">blah</Container>
            </Row>

            <Row>
              <Container className="content-border">blah</Container>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container>
            <Row>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
            </Row>
            <Row>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
              <Col>
                <Container className="content-border">blah</Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default ZoneRetentionTimeReport;
