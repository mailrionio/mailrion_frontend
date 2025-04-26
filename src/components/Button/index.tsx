/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./button.scss";
interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  to?: string | number;
  arrIcon?: boolean;
  plusIcon?: boolean;
  color?: string;
  fullWidth?: boolean;
}

const Button = ({
  text,
  onClick,
  className,
  type = "button",
  to,
  disabled,
  arrIcon,
  plusIcon,
  fullWidth,
  color,
}: ButtonProps) => {
  return (
    <div
      className={`button-container ${fullWidth && "full-width"} ${className} ${
        disabled ? "isDisabled" : ""
      }`}
    >
      {to ? (
        <Link style={{ color: color }} to={to as string | any}>
          {plusIcon && <FaPlus className="add_icon mr-1" />}
          <p>{text}</p>
          {arrIcon && (
            <div className="ml-1 arr">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
              >
                <path
                  d="M15.4006 5.92969L21.4706 11.9997L15.4006 18.0697"
                  stroke="var(--secondary-color)"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.47058 12H21.3006"
                  stroke="var(--secondary-color)"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </Link>
      ) : (
        <button
          onClick={onClick}
          type={type}
          style={{ color: color }}
          disabled={disabled}
        >
          {plusIcon && <FaPlus className="add_icon mr-1" />}
          <p className="text">{text}</p>
          {arrIcon && (
            <div className="ml-1 arr">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="24"
                viewBox="0 0 25 24"
              >
                <path
                  d="M15.4006 5.92969L21.4706 11.9997L15.4006 18.0697"
                  stroke="var(--secondary-color)"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.47058 12H21.3006"
                  stroke="var(--secondary-color)"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </button>
      )}
    </div>
  );
};

export default Button;
