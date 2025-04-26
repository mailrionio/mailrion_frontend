import Button from "@/components/Button";
import GeneralModal from "@/components/GeneralModal";
import SelectField from "@/components/SelectField";
import React, { useState } from "react";

interface ConfigureABTestProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfigureABTest = ({ setModal }: ConfigureABTestProps) => {
  const [auto, setAuto] = useState("");
  const [criteria, setCriteria] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [testGroupAValue, setTestGroupAValue] = useState<number>(48);
  return (
    <GeneralModal
      title="Configure your A/B test"
      subTitle="Use the slider to set the size of the test group and the winning criteria."
      width="800px"
      height="450px"
      handleClose={() => setModal(false)}
    >
      <div className="ab-test-configure">
        <div className="ab-slider">
          <p>
            <span>{Number(testGroupAValue) - 2}% Receive the variants</span>
            <span>{testGroupAValue + 2}% receive the winning message </span>
          </p>
          <div className="input-slider-cont">
            <input
              className="input-slider"
              onChange={(e) => setTestGroupAValue(Number(e.target.value))}
              type="range"
              min="0"
              max="100"
              value={testGroupAValue}
            />
            <output>{testGroupAValue}%</output>
          </div>
        </div>
        <div className="ab-test-criteria">
          <div className="criteria-selection">
            <SelectField
              name="auto"
              label="Should we send the winning message automatically?"
              handleChange={(e) => setAuto(e.target.value)}
              required
              options={["Yes", "No"]}
              value={auto}
            />
            <div className="manual-criteria">
              <p>How should we choose the winning message?</p>
              <div className="criteria">
                <SelectField
                  name="criteria"
                  label="By"
                  handleChange={(e) => setCriteria(e.target.value)}
                  required
                  options={["Open rate", "Click rate", "Conversion rate"]}
                  value={criteria}
                />
                <SelectField
                  name="day"
                  label="After"
                  handleChange={(e) => setDay(e.target.value)}
                  required
                  options={["1 day", "2 days", "3 days"]}
                  value={day}
                />
                <SelectField
                  name="time"
                  label="Time"
                  handleChange={(e) => setTime(e.target.value)}
                  required
                  options={["1 Hour", "3 Hours", "6 Hours"]}
                  value={time}
                />
              </div>
            </div>
          </div>
          <div className="test-group">
            <div className="name">
              <h3>Test Group</h3>
              <p>
                <span className="dotted"></span>
                <span>Variant A</span>
              </p>
              <p>
                <span className="dotted b"></span>
                <span>Variant B</span>
              </p>

              <p>
                <span className="dotted c"></span>
                <span>Winning message</span>
              </p>
            </div>
            <div className="percentage">
              <h3>{testGroupAValue}%</h3>
              <p>26%</p>
              <p>26%</p>
              <p>48%</p>
            </div>
          </div>
        </div>
        <div className="btns">
          <Button text="Save" />
          <Button
            text="Cancel"
            className="outline"
            onClick={() => setModal(false)}
          />
        </div>
      </div>
    </GeneralModal>
  );
};

export default ConfigureABTest;
