import { useEffect } from "react";
import useDeviceDetect from "@utils/useDeviceDetect";

interface CanvasProps {
  removeSelf: (value: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ removeSelf }) => {
  const { isMobile } = useDeviceDetect();

  useEffect(() => {
    /**
     * Disable the canvas / preloader completely.
     * We immediately tell the parent that the canvas is "done"
     * so the SVG scene and hover animations can load normally.
     */
    removeSelf(false);
  }, [removeSelf]);

  /**
   * Render nothing.
   * No canvas, no Three.js, no listeners, no animation loop.
   */
  return null;
};

export default Canvas;
