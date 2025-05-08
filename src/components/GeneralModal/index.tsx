import { useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import ToolTip from "../ToolTip";
import "./general-modal.scss";
interface IModalProps {
  title: string;
  width: string;
  height: string;
  subTitle?: string;
  children: React.ReactNode;
  handleClose: () => void;
  maxWidth?: string;
}

/**
 *
 * @param title
 * A title that displays in the head of the moadal
 * @param subTitle
 * A sub title that displays in the head below the main title of the modal
 * @param width
 * A width of the body of the modal, must be specified in px or rem or any valid css unit selectors
 * @param height
 * A height of the body of the modal, must be specified in px or rem or any valid css unit selectors
 * @param children
 * A children element of the modal, which must be a valid html element
 * @param handleClose
 * A function use to close the modal when opened
 *
 */

const GeneralModal = ({
  children,
  handleClose,
  height,
  title,
  width,
  subTitle,
  maxWidth,
}: IModalProps) => {
  const { theme } = useAppSelector((state) => state.utils);

  useEffect(() => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown as unknown as EventListener
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown as unknown as EventListener
      );
    };
  }, [handleClose]);
  return (
    <div className="generalModal" data-theme={theme}>
      <div
        className="generalModal__body"
        style={{
          width: width,
          height: height,
          maxWidth: maxWidth,
        }}
      >
        <div className="body__wrap">
          <div className="generalModal__body__wrap__header">
            <div className="modal_title">
              <h3>{title}</h3>
              {subTitle}
            </div>
            <ToolTip
              content="close (press esc)"
              position="up"
              classes="close more"
              handleClick={handleClose}
            >
              <p>x</p>
            </ToolTip>
          </div>
          <div className="modal-children">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GeneralModal;
