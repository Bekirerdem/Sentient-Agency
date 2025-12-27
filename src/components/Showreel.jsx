import { useRef, useState, useMemo } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// --- R3F POINT CLOUD ---
const ParticleField = () => {
  const ref = useRef();
  
  // Generate stable random points
  const positions = useMemo(() => {
    const count = 3000; // Point count
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360); 
      const phi = THREE.MathUtils.randFloatSpread(360); 
      
      // Spread them in a large volume
      array[i * 3] = THREE.MathUtils.randFloatSpread(15);     // x
      array[i * 3 + 1] = THREE.MathUtils.randFloatSpread(10); // y
      array[i * 3 + 2] = THREE.MathUtils.randFloatSpread(10); // z
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth idle rotation
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;

    // Interactive wave effect with mouse
    // Simply easing the group rotation towards mouse position for a "looking at" feel
    const x = state.pointer.x * 0.2;
    const y = state.pointer.y * 0.2;
    
    // We can also access the attribute to animate points individually if needed, 
    // but for performance and style, rotating the entire cloud slightly is elegant.
    ref.current.rotation.x += (y - ref.current.rotation.x) * delta * 2;
    ref.current.rotation.y += (x - ref.current.rotation.y) * delta * 2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#CCFF00"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

// --- HELPERS ---
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="relative z-20"
    >
      {children}
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
const Showreel = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const videoUrl = "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/hero.mp4";

  return (
    <section className="relative w-full h-[80vh] bg-black flex items-center justify-center overflow-hidden">
      
      {/* 3D POINT CLOUD BACKGROUND */}
      <div className="absolute inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <color attach="background" args={["#000000"]} />
            <ParticleField />
         </Canvas>
      </div>

      {/* VIGNETTE GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] pointer-events-none z-0 opacity-80" />

      {/* CENTER INTERACTION AREA */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        
        {/* STATIC SIGNATURE & TYPOGRAPHY */}
        <div className="mb-12 pointer-events-none select-none group">
             <h2 className="text-sm md:text-base font-mono text-gray-500 tracking-[0.5em] uppercase mb-4 opacity-50">
               // Digital Signature
             </h2>
             <motion.h2 
               className="text-5xl md:text-8xl font-black text-white font-clash uppercase tracking-tighter leading-none transition-all duration-300"
               style={{ textShadow: "0 0 0px rgba(0,0,0,0)" }}
             >
                <span className="group-hover:[text-shadow:2px_0_red,-2px_0_blue] transition-[text-shadow] duration-300">WATCH THE</span> <br/> 
                <span className="group-hover:[text-shadow:2px_0_red,-2px_0_blue] transition-[text-shadow] duration-300 text-white">REVOLUTION</span>
             </motion.h2>
        </div>

        {/* MAGNETIC BUTTON */}
        <MagneticButton>
            <div 
                onClick={() => setModalOpen(true)}
                className="group/btn relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center cursor-pointer"
            >
                {/* Expanding Ring */}
                <div className="absolute inset-0 rounded-full border border-[#CCFF00] opacity-30 group-hover/btn:scale-150 group-hover/btn:opacity-0 transition-all duration-700 ease-out" />
                
                {/* Main Circle */}
                <div className="relative w-full h-full bg-[#CCFF00]/10 backdrop-blur-md rounded-full border border-[#CCFF00] flex items-center justify-center transition-all duration-300 group-hover/btn:bg-[#CCFF00]">
                    {/* Play Icon */}
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-[#CCFF00] border-b-[10px] border-b-transparent ml-2 group-hover/btn:border-l-black transition-colors duration-300" />
                </div>
            </div>
        </MagneticButton>
      </div>

      {/* FULL SCREEN MODAL */}
      <AnimatePresence>
        {modalOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            >
                {/* Close Button */}
                <button 
                   onClick={() => setModalOpen(false)}
                   className="absolute top-8 right-8 z-[210] text-white hover:text-[#CCFF00] text-xs font-mono tracking-widest uppercase flex items-center gap-3 transition-colors"
                >
                    [ CLOSE ]
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">✕</div>
                </button>

                {/* Video Player */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                >
                    <video 
                        src={videoUrl}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                    />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
export default Showreel;