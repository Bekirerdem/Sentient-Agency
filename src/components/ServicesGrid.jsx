import React, { useRef } from "react";
import { motion, useInView, useMotionTemplate, useMotionValue } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const services = [
  {
    id: "01",
    tag: "// 01_STRATEGY",
    title: "Digital Dominance",
    desc: "Data-driven roadmaps to crush competition. We analyze, predict, and execute with surgical precision.",
    colSpan: "md:col-span-2",
  },
  {
    id: "02",
    tag: "// 02_NEURAL",
    title: "AI Integration",
    desc: "Self-learning neural interfaces. Systems that adapt to user behavior in real-time.",
    colSpan: "md:col-span-1",
  },
  {
    id: "03",
    tag: "// 03_RENDER",
    title: "Visual Architecture",
    desc: "High-performance immersive motion. Aesthetics that command attention in the Web3 era.",
    colSpan: "md:col-span-3",
  }
];

const ServiceCard = ({ service, index, setCursorVariant }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
        className={`group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md p-8 md:p-12 ${service.colSpan} transition-colors duration-500 hover:border-[#CCFF00]/30 flex flex-col justify-between h-[300px] md:h-[400px]`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setCursorVariant("text")} 
        onMouseLeave={() => setCursorVariant("default")}
        variants={{
            hidden: { opacity: 0, y: 50, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
        }}
    >
        {/* Mouse Glow Effect */}
        <motion.div 
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        650px circle at ${mouseX}px ${mouseY}px,
                        rgba(204, 255, 0, 0.1),
                        transparent 80%
                    )
                `
            }}
        />

        {/* Abstract Animated Icons */}
        <div className="absolute right-0 top-0 p-10 opacity-10 transition-all duration-700 group-hover:opacity-50 group-hover:scale-110 group-hover:rotate-6">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#CCFF00" strokeWidth="0.5">
                {index === 0 && (
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                )}
                {index === 1 && (
                   <>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2"/>
                    <path d="M12 2v20M2 12h20" strokeOpacity="0.5"/>
                   </>
                )}
                {index === 2 && (
                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                )}
            </svg>
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
                 <div className="mb-6 inline-block rounded-sm border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-3 py-1 font-mono text-xs text-[#CCFF00] tracking-widest">
                    {service.tag}
                 </div>
                 <h3 className="max-w-lg mb-4 font-clash text-4xl md:text-5xl font-black uppercase text-white leading-[0.9] group-hover:translate-x-2 transition-transform duration-300">
                    {service.title}
                 </h3>
                 <p className="max-w-md font-mono text-sm leading-relaxed text-gray-500 group-hover:text-gray-300 transition-colors">
                    {service.desc}
                 </p>
            </div>
            
            <div className="flex items-center gap-4 opacity-50 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2">
                <span className="font-bold text-[#CCFF00] text-[10px] tracking-[0.2em] uppercase">Initialize</span>
                <span className="text-[#CCFF00] text-xl">→</span>
            </div>
        </div>
    </motion.div>
  );
};

const ServicesGrid = () => {
    const { setCursorVariant } = useCursor();
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { margin: "0px 0px -20% 0px", once: true });

  return (
    <section id="services" className="w-full bg-[#050505] py-32 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#CCFF00]/5 via-transparent to-transparent opacity-30 pointer-events-none" />

      <div className="container mx-auto" ref={containerRef}>
        
        <div className="mb-20">
             <span className="text-[#CCFF00] font-mono text-xs tracking-widest uppercase">// CAPABILITIES</span>
             <h2 className="text-5xl md:text-8xl font-black text-white uppercase font-clash mt-4">
                 Sentient <span className="text-transparent stroke-text-white">Architecture</span>
             </h2>
        </div>

        <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
                visible: { transition: { staggerChildren: 0.2 } }
            }}
        >
          {services.map((service, i) => (
             <ServiceCard key={service.id} service={service} index={i} setCursorVariant={setCursorVariant} />
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;