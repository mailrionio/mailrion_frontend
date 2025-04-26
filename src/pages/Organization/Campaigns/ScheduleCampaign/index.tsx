import { ChangeEvent, useState } from "react";
import Button from "../../../../components/Button";
import GeneralModal from "../../../../components/GeneralModal";
import CalendarPicker from "./CalenderPicker";
import TimePicker from "./TimePicker";
import "./schedule-campaign.scss";
interface props {
  handleClose: () => void;
}
const ScheduleCampaign = ({ handleClose }: props) => {
  const [selectDate, setSelectDate] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<{
    time: string;
    when: string;
  }>({ time: "09:40", when: "AM" });
  const [selectedFrequency, setSelectedFrequency] = useState<string>("Daily");
  const handleSelectDate = (formattedDate: string) => {
    setSelectDate(formattedDate);
  };
  const handleSelectedTime = (time: string, when: string) => {
    setSelectedTime({ time, when });
  };

  const handleScheduleCampaign = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectDate, selectedDay, selectedTime);

    handleClose();
  };
  return (
    <GeneralModal
      title={"Schedule campaign"}
      subTitle="Auto responder"
      width={"800px"}
      height={"580px"}
      handleClose={handleClose}
    >
      <form className="schedule-campaign" onSubmit={handleScheduleCampaign}>
        <div className="filter-options">
          <div className="filter-elements">
            {["Daily", "Weekly", "Intervals", "Monthly"].map((item) => {
              return (
                <div
                  className={`filter-option ${
                    selectedFrequency === item ? "active" : ""
                  }`}
                  onClick={() => setSelectedFrequency(item)}
                  key={item}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>

        <div className="select-days">
          <div className="calendar">
            <CalendarPicker onSelectDate={handleSelectDate} />
          </div>
          <div className="select-day-wrap">
            <h3>Days</h3>
            <div className="select-day-wrap__days">
              {[
                "Monday",
                "Tueday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div
                  key={day}
                  className={`day-option ${
                    selectedDay === day ? "active" : ""
                  }`}
                  onClick={() => setSelectedDay(day)}
                >
                  <input type="radio" name="day" id="day" value={day} />
                  <p> {day}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="select-time">
            <TimePicker onTimeSelect={handleSelectedTime} />
          </div>
        </div>
        <div className="btns-wrap">
          <div />
          <div className="btns">
            <Button text="Cancel" className="outline" onClick={handleClose} />
            <Button text="Save and publish" type="submit" />
          </div>
        </div>
      </form>
    </GeneralModal>
  );
};

export default ScheduleCampaign;
