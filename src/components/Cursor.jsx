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
      height: 16,
      width: 16,
      backgroundColor: "#CCFF00",
      borderRadius: "50%",
      opacity: 1,
      rotate: 0,
      // 5 Noktalı Daire (Karemsi, radius ile yuvarlanıyor)
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 50%)" 
    },
    square: {
      height: 48,
      width: 48,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      opacity: 1,
      rotate: 45,
      // 5 Noktalı Kare (Son nokta 4. ile aynı)
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)"
    },
    triangle: {
      height: 64,
      width: 64,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      opacity: 1,
      rotate: 0,
      // 5 Noktalı Üçgen (Son 2 nokta gizli)
      clipPath: "polygon(50% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 100%)"
    },
    pentagon: {
      height: 64,
      width: 64,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      opacity: 1,
      rotate: 0,
      // Zaten 5 nokta
      clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
    },
    diamond: {
      height: 64,
      width: 64,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      opacity: 1,
      rotate: 0,
      // 5 Noktalı Elmas (Son nokta gizli)
      clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 0% 50%)"
    },
    text: {
      height: 100,
      width: 4,
      backgroundColor: "#CCFF00",
      borderRadius: "0%",
      opacity: 1,
      rotate: 0,
      // 5 Noktalı Çubuk
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%)"
    }
  };

  return (
    <motion.div
      className="hidden md:flex fixed top-0 left-0 z-[9999] pointer-events-none items-center justify-center"
      variants={variants}
      animate={cursorVariant}
      transition={{
        // HAREKET: Yumuşak (Spring)
        x: { type: "spring", stiffness: 800, damping: 30, mass: 0.5 },
        y: { type: "spring", stiffness: 800, damping: 30, mass: 0.5 },
        // ŞEKİL DEĞİŞİMİ: Anlık (Duration 0) - Bu console hatalarını engeller
        height: { duration: 0.2 },
        width: { duration: 0.2 },
        clipPath: { duration: 0 }, // KRİTİK AYAR: Geometriyi morflama, direkt değiştir.
        borderRadius: { duration: 0.2 } 
      }}
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
        translateX: "-50%",
        translateY: "-50%",
        // MixBlendMode: Difference en net ters çevirme efektini verir.
        mixBlendMode: "difference", 
        boxShadow: "0 0 20px rgba(204, 255, 0, 0.4)" // Görünürlüğü artırmak için neon glow
      }}
    />
  );
};

export default Cursor;