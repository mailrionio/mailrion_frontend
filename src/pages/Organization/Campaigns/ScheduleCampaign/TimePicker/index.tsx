import { useState } from "react";
import "./time-picker.scss";

interface TimePickerProps {
  onTimeSelect: (time: string, when: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState("09:40");
  const [selectedWhen, setSelectedWhen] = useState<string>("AM"); // ["AM", "PM"]

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
    onTimeSelect(e.target.value, selectedWhen);
  };

  const handleWhenOptionClick = (when: string) => {
    setSelectedWhen(when);
    onTimeSelect(selectedTime, when);
  };

  return (
    <div className="time-picker">
      <h3>Time</h3>
      <div className="timeoptions">
        <div className="time-card">
          <input
            type="time"
            name=""
            id=""
            value={selectedTime}
            onChange={handleTimeChange}
          />
        </div>
        <div className="when-card">
          {["AM", "PM"].map((when) => (
            <p
              key={when}
              className={`when-option ${
                selectedWhen === when ? "active-when" : ""
              }`}
              onClick={() => handleWhenOptionClick(when)}
            >
              {when}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
