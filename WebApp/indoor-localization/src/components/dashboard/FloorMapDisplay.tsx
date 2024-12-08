import { useEffect, useRef } from "react";
import DashboardDisplayManager from "./../../managers/DashboardDisplayManager.tsx"; // Import the manager
import "./FloorMapDisplay.css";

function FloorMapDisplay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const displayManagerRef = useRef<DashboardDisplayManager | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const manager = new DashboardDisplayManager(canvas);
      displayManagerRef.current = manager;

      return () => {
        manager.destroy();
      };
    }
  }, []);

  return (
    <div className="floor-map-display">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default FloorMapDisplay;
