import React from "react";
import { SynSelect, SynOption } from "@synergy-design-system/react";
import "./TimePicker.css";

interface TimePickerProps {
  value: string;
  onChange: (params: { value: string; isHour: boolean }) => void;
  hourOptions: string[];
  minuteOptions: string[];
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  hourOptions,
  minuteOptions,
  className = "",
}) => {
  return (
    <div className={`time-picker ${className}`}>
      <SynSelect
        size="medium"
        value={value.split(":")[0]}
        onChange={(e) =>
          onChange({
            value: (e.target as HTMLSelectElement).value,
            isHour: true,
          })
        }
      >
        {hourOptions.map((hour) => (
          <SynOption key={hour} value={hour}>
            {hour}
          </SynOption>
        ))}
      </SynSelect>
      <span className="colon">:</span>
      <SynSelect
        size="medium"
        value={value.split(":")[1]}
        onChange={(e) =>
          onChange({
            value: (e.target as HTMLSelectElement).value,
            isHour: false,
          })
        }
      >
        {minuteOptions.map((minute) => (
          <SynOption key={minute} value={minute}>
            {minute}
          </SynOption>
        ))}
      </SynSelect>
    </div>
  );
};

export default TimePicker;
