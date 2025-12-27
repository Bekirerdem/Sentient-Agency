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

  const variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      height: 12,
      width: 12,
      backgroundColor: "#CCFF00",
      mixBlendMode: "normal",
      borderRadius: "50%",
      scale: 1,
      opacity: 1,
      clipPath: "none",
      transition: {
        type: "spring",
        mass: 0.5,
        clipPath: { duration: 0 } // INSTANT SWITCH to prevent glitch
      }
    },
    text: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "#CCFF00",
      mixBlendMode: "difference", 
      borderRadius: "50%",
      scale: 1,
      opacity: 0.5,
      clipPath: "none",
    },
    square: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "#CCFF00",
      borderRadius: "0%", // SQUARE
      mixBlendMode: "difference",
      scale: 1,
      opacity: 0.8,
      rotate: 45,
      clipPath: "none",
    },
    triangle: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", // TRIANGLE
      mixBlendMode: "difference",
      scale: 1,
      opacity: 0.8,
    },
    pentagon: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)", // PENTAGON
      mixBlendMode: "difference",
      scale: 1,
      opacity: 0.8,
    },
    diamond: {
        x: mousePosition.x - 24,
        y: mousePosition.y - 24,
        height: 48,
        width: 48,
        backgroundColor: "#CCFF00",
        borderRadius: "0%",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", // DIAMOND
        mixBlendMode: "difference",
        scale: 1,
        opacity: 0.8,
      }
  };

  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 z-[10000] pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 40,
        mass: 0.5
      }}
    />
  );
};

export default Cursor;