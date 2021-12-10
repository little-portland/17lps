import { useState, useEffect } from "react";
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });

  const throttledX = mousePosition.x;
  const throttledY = mousePosition.y;

  const updateMousePosition = (event: MouseEvent) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener("pointermove", updateMousePosition);

    return () => window.removeEventListener("pointermove", updateMousePosition);
  }, []);

  return { x: throttledX, y: throttledY };
};

export default useMousePosition;
