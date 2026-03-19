/**
 * @file src/components/Toast.jsx
 * @description Auto-dismissing notification toast.
 */

import { useEffect } from "react";
import Icon from "./Icon";

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast" role="alert" aria-live="polite">
      <Icon name="check" size={16} color="var(--gold)" />
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          color: "var(--silver)",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label="Dismiss notification"
      >
        <Icon name="close" size={14} color="var(--silver)" />
      </button>
    </div>
  );
};

export default Toast;
