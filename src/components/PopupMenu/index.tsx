/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
// import "./popupMenu.scss";

interface PopupMenuProps {
  children: React.ReactNode;
}

const PopupMenu = ({ children }: PopupMenuProps) => {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const clickX = e.clientX;
    const clickY = e.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = 200;
    const rootH = 200;

    // Calculate whether to show the menu to the right or left of the cursor
    const right = screenW - clickX > rootW;
    const left = !right;

    // Calculate whether to show the menu at the top or bottom of the cursor
    const top = screenH - clickY > rootH;
    const bottom = !top;

    // Calculate the final menu position based on the available space
    let x = clickX;
    let y = clickY;

    if (right) {
      x = clickX;
    } else if (left) {
      x = clickX - rootW;
    }

    if (bottom) {
      y = Math.max(0, clickY - rootH); // Adjusted this line
    }

    setMenuPosition({ x, y });
  };

  useEffect(() => {
    const handleClick = (event: any) => {
      const clickEl = event.target;
      console.log(clickEl);

      // Check if the clicked element has the class "more" or "more-options"
      const hasMoreClass = clickEl.classList?.contains("more-options");

      // Check if the clicked element has an <img> child with class "moreIcon"
      const hasMoreIconChild = clickEl.querySelector("img.moreIcon");
      console.log(hasMoreIconChild);

      if (hasMoreIconChild || hasMoreClass) {
        handleContextMenu(event);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      className="popup-menu more-options"
      style={{ left: menuPosition.x, top: menuPosition.y }}
    >
      {children}
    </div>
  );
};

export default PopupMenu;
