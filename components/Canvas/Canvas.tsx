import { useEffect, useRef } from "react";

interface CanvasProps {
  removeSelf: (value: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ removeSelf }) => {
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Delay removal by one animation frame
    rafRef.current = requestAnimationFrame(() => {
      removeSelf(false);
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [removeSelf]);

  // IMPORTANT: keep a real DOM node mounted for one frame
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
