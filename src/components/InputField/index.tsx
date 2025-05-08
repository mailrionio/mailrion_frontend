import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import React, { FC, memo } from "react";
import "./inputField.scss";

interface InputFieldProps {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
  classes: string;
  value: string;
  placeholder: string;
  label: string;
  required: boolean;
  disabled?: boolean;
  autoComplete?: string;
  togglePassword?: () => void;
  key?: number;
}

const InputField: FC<InputFieldProps> = ({
  handleChange,
  type,
  name,
  classes,
  value,
  placeholder,
  required,
  label,
  disabled,
  autoComplete,
  togglePassword,
  key,
}) => {
  return (
    <div
      key={key}
      className={`input-container ${classes} ${disabled ? "disabled" : ""}`}
    >
      <label htmlFor={name}>
        {label}{required && <span className="required">*</span>}
      </label>
      <div className="input-group">
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
        />
        {name === "password" && (
          <>
            {type === "password" ? (
              <span className="show-password" onClick={togglePassword}>
                <AiOutlineEye color="var(--secondary-color)" />
              </span>
            ) : (
              <AiOutlineEyeInvisible
                color="var(--secondary-color)"
                onClick={togglePassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default memo(InputField);
