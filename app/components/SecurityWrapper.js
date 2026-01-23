"use client";
import { useEffect } from "react";

export default function SecurityWrapper({ children }) {
  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e) => e.preventDefault();
    
    // 2. Disable Dragging
    const handleDragStart = (e) => e.preventDefault();

    // 3. Disable Keyboard Shortcuts (F12, Ctrl+U, etc.)
    const handleKeyDown = (e) => {
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && e.key === 'u') // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Attach listeners
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
}
