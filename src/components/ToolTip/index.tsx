/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Tooltip from "react-tooltip-lite";

interface CustomTooltipProps {
  children: React.ReactNode;
  classes?: string;
  content: string;
  position: string;
  disable?: boolean;
  handleClick?: (e: any) => void;
}

const ToolTip: React.FC<CustomTooltipProps> = ({
  children,
  classes,
  position,
  content,
  disable = false,
  handleClick,
}) => {
  return (
    <div onClick={handleClick} className={classes}>
      {!disable ? (
        <Tooltip direction={position} content={content}>
          {children}
        </Tooltip>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
};

export default ToolTip;
