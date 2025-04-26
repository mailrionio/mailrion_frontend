import React from "react";
import {
  FaBug,
  FaCheck,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaInfo,
} from "react-icons/fa";
import { ToastOptions, toast } from "react-toastify";

interface ToastMessageProps {
  type: string;
  message: string;
}
interface Toast {
  [key: string]: (
    content: React.ReactNode,
    options?: ToastOptions
  ) => React.ReactText;
}

export const displayIcon = (type: string): JSX.Element => {
  switch (type) {
    case "success":
      return <FaCheck />;
    case "info":
      return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    case "warning":
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage: React.FC<ToastMessageProps> = ({ type, message }) => (
  <>
    {(toast as unknown as Toast)[type](
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
          {message}
        </div>
      </div>
    )}
  </>
);

// ToastMessage.dismiss = toast.dismiss;

export default ToastMessage;
