import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const Cursor = () => {
  const { cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  // Ultra-minimal "Sentient" Cursor
  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none rounded-full mix-blend-difference bg-[#CCFF00]"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
        scale: cursorVariant === "text" ? 2 : 1,
        opacity: 1
      }}
      transition={{
        type: "spring",
        stiffness: 1500,
        damping: 100,
        mass: 0.1
      }}
      style={{
        width: 12,
        height: 12,
        boxShadow: "0 0 10px rgba(204,255,0,0.8)"
      }}
    />
  );
};

export default Cursor;