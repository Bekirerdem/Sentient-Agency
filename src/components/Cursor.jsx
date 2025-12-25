import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const Cursor = () => {
  const { cursorVariant } = useCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      borderWidth: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0)',
    }
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      opacity: 0, // Hide dot on hover if preferred, or keep it
    }
  };

  return (
    <>
      {/* Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 border rounded-full pointer-events-none z-[9999] mix-blend-difference"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.5
        }}
      />
      
      {/* Leader Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-neon-green rounded-full pointer-events-none z-[10000] mix-blend-difference"
        variants={dotVariants}
        animate="default" // Dot always follows closely
        transition={{
            type: "tween",
            ease: "linear",
            duration: 0
        }}
      />
    </>
  );
};

export default Cursor;
