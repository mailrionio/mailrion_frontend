import React, { useState } from "react";
import "./checkbox.scss";

interface CheckboxProps {
  checkedState: boolean;
  onChange: (checked: boolean) => void;
  htmlfor?: string;
  name?: string;
  value?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checkedState = false,
  onChange,
  htmlfor,
  name,
  value,
}) => {
  const [checked, setChecked] = useState(checkedState);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className={`custom-checkbox ${checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        id={htmlfor}
      />
      <span className="toggle" />
    </label>
  );
};

export default Checkbox;
