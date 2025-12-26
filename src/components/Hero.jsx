import React, { useRef } from "react";
import { motion } from "framer-motion";

const AgencyVision = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cards = [
    {
      id: "core",
      title: "Core_Intelligence",
      version: "V.2.4.0",
      modules: [
        { name: "Strategic AI", status: "ACTIVE", desc: "Autonomous agents for market analysis." },
        { name: "Neural Automation", status: "PROCESSING", desc: "Optimizing workflow latency..." }
      ],
      code: ["initializing neural_bridge...", "optimizing thresholds...", "DEPLOYMENT READY"]
    },
    {
      id: "creative",
      title: "Creative_Synthesis",
      version: "V.1.8.2",
      modules: [
        { name: "Generative UI", status: "COMPILING", desc: "Real-time interface adaptation." },
        { name: "Dynamic Branding", status: "ACTIVE", desc: "Liquid identity systems engaged." }
      ],
      code: ["loading aesthetic_tensor...", "blending gradients...", "VISUAL SYNC COMPLETE"]
    },
    {
      id: "predict",
      title: "Predictive_Engine",
      version: "V.3.0.1",
      modules: [
        { name: "Market Foresight", status: "CALCULATING", desc: "Pattern recognition in progress." },
        { name: "Omni-Channel Sync", status: "LINKED", desc: "Cross-platform consistency verified." }
      ],
      code: ["fetching dataset_v4...", "reducing error_margin...", "PREDICTION STABLE"]
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getCardStyle = (index) => {
    const total = cards.length;
    let offset = (index - activeIndex) % total;
    if (offset < 0) offset += total;
    
    // Responsive offset
    const xOffset = isMobile ? 40 : 240;

    if (offset === 0) {
        return { 
            x: 0,
            scale: 1, 
            zIndex: 30, 
            opacity: 1, 
            filter: "blur(0px) brightness(1)",
            rotateY: 0
        };
    } else if (offset === 1) {
        // Right Side
        return { 
            x: xOffset, 
            scale: 0.8, 
            zIndex: 10, 
            opacity: 0.5, 
            filter: "blur(2px) brightness(0.6)", 
            rotateY: -15
        };
    } else {
        // Left Side 
        return { 
            x: -xOffset, 
            scale: 0.8, 
            zIndex: 10, 
            opacity: 0.5, 
            filter: "blur(2px) brightness(0.6)",
            rotateY: 15
        };
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-8 perspective-1000 mt-8 md:mt-0 max-w-[100vw] overflow-hidden">
      <div className="relative w-full max-w-md h-[400px] flex items-center justify-center translate-y-8"> 
          {cards.map((card, index) => {
              const style = getCardStyle(index);
              return (
                <motion.div 
                    key={card.id}
                    initial={false}
                    animate={style}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute top-0 left-0 w-full bg-black/80 backdrop-blur-xl border border-white/10 p-6 overflow-hidden origin-center shadow-2xl"
                    style={{ 
                        transformStyle: "preserve-3d",
                        width: "100%",
                        boxShadow: activeIndex === index ? "0 0 40px rgba(204, 255, 0, 0.15)" : "none"
                    }}
                >
                    {/* Decorative Grid Background */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent opacity-50" />

                    {/* Header */}
                    <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${activeIndex === index ? "bg-[#CCFF00] animate-pulse" : "bg-white/20"}`} />
                            <span className="text-xs font-mono text-[#CCFF00] tracking-widest uppercase">
                                {card.title}
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-white/30">{card.version}</span>
                    </div>

                    {/* Content Modules */}
                    <div className="space-y-3 relative z-10">
                        {card.modules.map((mod, i) => (
                            <div key={i} className="group border border-white/5 p-3 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-[#CCFF00] transition-colors">{mod.name}</h3>
                                    <span className={`text-[8px] font-mono px-1.5 py-0.5 border rounded-full ${mod.status === 'ACTIVE' || mod.status === 'LINKED' ? 'text-[#CCFF00] border-[#CCFF00]/20' : 'text-white/50 border-white/10'}`}>
                                        {mod.status}
                                    </span>
                                </div>
                                <p className="text-[9px] text-white/40 font-mono leading-relaxed truncate">
                                    {mod.desc}
                                </p>
                                {/* Active Loader for second item */}
                                {i === 1 && activeIndex === index && (
                                    <div className="w-full h-0.5 bg-white/10 mt-2 overflow-hidden">
                                        <motion.div 
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "0%" }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-full bg-[#CCFF00]"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Code Snippet Look */}
                        <div className="mt-4 p-3 bg-black/90 border-l-2 border-[#CCFF00]/50 font-mono text-[9px] text-white/40">
                            {card.code.map((line, i) => (
                                <div key={i} className="flex gap-2">
                                <span className="text-[#CCFF00]">{">"}</span>
                                <span className={i === 2 ? "text-white" : ""}>{line}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#CCFF00]/30" />
                </motion.div>
              );
          })}
      </div>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* REMOTE VIDEO: hero.mp4 */}
      <div className="absolute inset-0 z-0">
        <video 
          src="https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/hero.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="none"
          className="w-full h-full object-cover opacity-30" // Opacity reduced for better text readability
        />
        <div className="absolute inset-0 bg-black -z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" /> {/* Gradient adjusted for left layout */}
        
        {/* Grid Overlay Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center w-full h-full p-4 pointer-events-none">
         
         {/* TOP ROW */}
         {/* Adjusted top position to avoid Navbar overlap */}
         <div className="absolute top-32 md:top-24 left-0 w-full p-6 md:p-12 flex justify-between items-start z-30">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 1 }}
               className="flex flex-col gap-1"
            >
               <span className="text-[10px] md:text-xs font-mono text-[#CCFF00] tracking-widest uppercase">
                  System_Status: <span className="text-white animate-pulse">ONLINE</span>
               </span>
               <span className="text-[10px] font-mono text-white/40 tracking-widest">
                  LOC: 41.0082° N, 28.9784° E
               </span>
            </motion.div>
         </div>

         {/* BOTTOM ROW */}
         <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0 z-30">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex gap-8 text-[10px] font-mono text-white/60 uppercase tracking-wider"
            >
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 border border-[#CCFF00] bg-transparent" />
                  <span>AI NATIVE</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#CCFF00]" />
                  <span>WEB 3.0 READY</span>
               </div>
            </motion.div>
         </div>
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-20 w-full h-full p-6 md:p-12 md:pt-32 grid grid-cols-1 md:grid-cols-[55%_45%] items-center overflow-y-auto md:overflow-visible">
        
        {/* LEFT SIDE - TEXT */}
        <motion.div 
           initial={{ opacity: 0, x: -50 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 1, ease: "circOut" }}
           className="flex flex-col items-start text-left pl-4 md:pl-12 z-30 mt-32 md:mt-0"
        >
          <div className="mb-6 flex items-center gap-4 overflow-hidden">
             <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#CCFF00]" />
             <span className="text-xs font-mono text-[#CCFF00] tracking-[0.5em] uppercase">
                Architecture of Tomorrow
             </span>
          </div>

          <h1 className="text-[10vw] md:text-[7.5vw] font-black text-white leading-[0.85] tracking-tight font-clash mix-blend-overlay">
            SENTIENT
          </h1>
          <h1 className="relative text-[10vw] md:text-[7.5vw] font-black text-transparent leading-[0.85] tracking-tight font-clash bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent z-10">
            REALITY
            <span className="absolute -top-2 -right-6 text-xl md:text-3xl text-[#CCFF00] font-mono font-normal">
               ®
            </span>
          </h1>
          
          <p className="mt-8 text-xs md:text-base tracking-[0.15em] font-mono text-white/70 uppercase max-w-xl leading-relaxed border-l-2 border-[#CCFF00] pl-6">
            We build autonomous digital ecosystems that <br/>
            <span className="text-white font-bold">think</span>, <span className="text-white font-bold">adapt</span>, and <span className="text-white font-bold">evolve</span>. 
          </p>

          <div className="mt-12 pointer-events-auto group cursor-pointer relative">
             <div className="absolute -inset-2 bg-[#CCFF00]/20 blur-lg group-hover:blur-xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
             <button className="relative px-8 py-4 bg-transparent border border-[#CCFF00]/50 text-[#CCFF00] font-black text-xs tracking-[0.3em] uppercase hover:bg-[#CCFF00] hover:text-black transition-all duration-300 clip-path-slant overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                   INITIATE PROTOCOL
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                   </svg>
                </span>
             </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE - 2D VISION TERMINAL */}
        <div className="w-full h-full relative z-20 pointer-events-auto flex items-center justify-center">
             <AgencyVision />
        </div>

      </div>
    </section>
  );
};

export default Hero;