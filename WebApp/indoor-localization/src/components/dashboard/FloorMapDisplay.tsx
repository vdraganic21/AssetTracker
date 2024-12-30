import { useEffect, useRef } from "react";
import DashboardDisplayManager from "./../../managers/DashboardDisplayManager.tsx"; // Import the manager
import "./FloorMapDisplay.css";
import { SynButton, SynIcon } from "@synergy-design-system/react";

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
      <div className="bottom-right-container">
        <div className="facility-column">
          <p className="facility-name">Facility name</p>
        </div>
        <div className="buttons-column">
          <SynButton>
            <SynIcon
              library="fa"
              name="fas-rotate-right"
              className="button-icon"
            />
          </SynButton>
          <SynButton>
            <SynIcon library="fa" name="fas-plus" className="button-icon" />
          </SynButton>
          <SynButton>
            <SynIcon library="fa" name="fas-minus" className="button-icon" />
          </SynButton>
        </div>
      </div>
    </div>
  );
}

export default FloorMapDisplay;
