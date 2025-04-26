/* eslint-disable @typescript-eslint/no-explicit-any */

import { FaTimes } from "react-icons/fa";
import "./portal.scss";

interface PortalProps<T> {
  selectedItems: T[];
  deleteText: string;
  onDelete: () => void;
  onClearSelection: () => void;
}

const Portalbar = <T,>({
  selectedItems,
  deleteText,
  onDelete,
  onClearSelection,
}: PortalProps<T>) => {
  const selectionCount = selectedItems.length;

  if (selectionCount === 0) {
    return null;
  }

  return (
    <div className="action-bar">
      <div className="selection-count">{`${selectionCount} Selected`}</div>
      <div className="icon-container">
        <h4 onClick={onDelete} className="del">
          {deleteText}
        </h4>
      </div>
      <div className="icon-container">
        <FaTimes onClick={onClearSelection} className="icon" />
      </div>
    </div>
  );
};

export default Portalbar;
