import React, { useState } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import "./calender.scss";

interface CalenderPickerProps {
  onSelectDate: (formattedDate: string) => void;
}

const CalendarPicker: React.FC<CalenderPickerProps> = ({ onSelectDate }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const handlePreviousMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
  };

  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleDayClick = (day: number) => {
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), day);
    let options = { day: "numeric", month: "short", year: "numeric" };
    const formatter = new Intl.DateTimeFormat(
      "en-US",
      options as Intl.DateTimeFormatOptions
    );
    const parts = formatter.formatToParts(selectedDate);
    let dayValue = parts.find((x) => x.type === "day")?.value;
    let monthValue = selectedDate.toLocaleString("default", { month: "long" });
    const yearValue = parts.find((x) => x.type === "year")?.value;
    let formattedDate = `${ordinal_suffix_of(
      dayValue as any
    )} ${monthValue} ${yearValue}`;
    if (onSelectDate) {
      onSelectDate(formattedDate);
    }
  };

  function ordinal_suffix_of(i: number): string {
    let j = i % 10,
      k = i % 100;
    if (j === 1 && k !== 11) {
      return i + "st";
    }
    if (j === 2 && k !== 12) {
      return i + "nd";
    }
    if (j === 3 && k !== 13) {
      return i + "rd";
    }
    return i + "th";
  }

  return (
    <div className="calender-picker">
      <div className="calender-picker__header">
        <div onClick={handlePreviousMonth}>
          <FaCaretLeft className="previous-month-icon" />
        </div>
        <div className="calender-picker__current-month">
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear()}
        </div>
        <div onClick={handleNextMonth}>
          <FaCaretRight className="next-month-icon" />
        </div>
      </div>
      <div className="calender-picker__body">
        <div className="calender-picker__days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day} className="calender-picker__day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="calender-picker__days">
          {currentMonthDays.map((day) => {
            const isPast =
              new Date() > new Date(date.getFullYear(), date.getMonth(), day);
            const isSelected = selectedDay === day;
            return (
              <div
                key={day}
                className={`calender-picker__day ${
                  isPast
                    ? "calender-picker__past"
                    : isSelected
                    ? "calender-picker__selected"
                    : ""
                }`}
                onClick={() => {
                  !isPast && setSelectedDay(day);
                  !isPast && handleDayClick(day);
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarPicker;
