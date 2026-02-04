import { useEffect, useRef } from "react";

interface CanvasProps {
  removeSelf: (value: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ removeSelf }) => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    /**
     * IMPORTANT:
     * Delay removal by one animation frame.
     * This keeps a real DOM node mounted long enough
     * for mobile SVG animations to fully initialize.
     */
    rafRef.current = requestAnimationFrame(() => {
      removeSelf(false);
    });

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [removeSelf]);

  /**
   * Keep a real DOM node mounted (but invisible).
   * This prevents mobile browsers from dropping SVG nodes
   * during initial layout / animation setup.
   */
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        background: "transparent",
      }}
    />
  );
};

export default Canvas;
