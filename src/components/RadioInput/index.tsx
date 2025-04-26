import React from "react";
import "./radio.scss";

interface IProps {
  checked: boolean;
  onChange: () => void;
  htmlFor?: string;
  name?: string;
  value?: string;
}

const RadioInput: React.FC<IProps> = ({
  checked,
  onChange,
  htmlFor,
  name,
  value,
}) => {
  return (
    <label className={`custom-radio ${checked ? "checked" : ""}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        id={htmlFor}
      />
      <span className="toggle" />
    </label>
  );
};

export default RadioInput;
