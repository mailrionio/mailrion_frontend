import React, { FC } from "react";
import "./selectField.scss";

interface SelectFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  classes?: string;
  value: string;
  label: string;
  required: boolean;
  disabled?: boolean;
  options: string[];
}

const SelectField: FC<SelectFieldProps> = ({
  handleChange,
  name,
  classes = "",
  value,
  required,
  label,
  options,
  disabled = false,
}) => {
  return (
    <div
      className={`select-container ${classes} ${disabled ? "disabled" : ""}`}
    >
      <label htmlFor={name}>
        {label} {required && <span>*</span>}
      </label>
      <select
        className="select-group"
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
