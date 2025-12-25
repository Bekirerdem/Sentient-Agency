// src/components/ServicesGrid.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "../context/CursorContext";

const Corner = ({ className }) => (
  <div className={`absolute w-3 h-3 border-t-2 border-l-2 border-[#CCFF00] opacity-50 group-hover:opacity-100 transition-opacity ${className}`} />
);

const ServicesGrid = () => {
  const { setCursorVariant } = useCursor();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBase = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yFast = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={containerRef} className="relative z-10 w-full px-4 py-32 mx-auto max-w-[95rem]">
      
      {/* Background Typography */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden pointer-events-none -z-10 mix-blend-overlay opacity-[0.03]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          <span className="text-[20vw] font-black text-white font-clash leading-none">
            SYSTEM ARCHITECTURE SYSTEM ARCHITECTURE
          </span>
          <span className="text-[20vw] font-black text-white font-clash leading-none">
            SYSTEM ARCHITECTURE SYSTEM ARCHITECTURE
          </span>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:h-[110vh] items-start justify-center">
        
        {/* LEFT COL */}
        <motion.div style={{ y: yBase }} className="w-full lg:w-7/12 h-[600px] lg:h-[850px]">
          <motion.div
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className="relative w-full h-full overflow-hidden bg-[#050505]/80 backdrop-blur-md border border-white/10 group hover:border-[#CCFF00]/50 transition-colors duration-500"
          >
             <Corner className="top-0 left-0" />
             <Corner className="top-0 right-0 rotate-90" />
             <Corner className="bottom-0 right-0 rotate-180" />
             <Corner className="bottom-0 left-0 -rotate-90" />

             <div className="absolute inset-0 z-0 opacity-20">
                 <div className="absolute inset-0 w-full h-full animate-[pan-grid_8s_linear_infinite]"
                   style={{
                     backgroundImage: `linear-gradient(to right, #CCFF00 0.5px, transparent 0.5px), linear-gradient(to bottom, #CCFF00 0.5px, transparent 0.5px)`,
                     backgroundSize: '40px 40px',
                   }}
                 />
             </div>
             
             <div className="relative z-10 flex flex-col justify-between h-full p-12">
               <div className="flex justify-between items-start">
                  <div className="px-4 py-1 text-xs font-mono text-[#CCFF00] border border-[#CCFF00]/30 rounded-full bg-[#CCFF00]/5">
                    SYS_V.4.0_ONLINE
                  </div>
                  <div className="w-24 h-24 border border-[#CCFF00]/20 rounded-full animate-spin-slow border-t-[#CCFF00]" />
               </div>

               <div>
                 <h3 className="text-7xl font-black text-white md:text-9xl font-clash tracking-tighter mix-blend-difference">
                   AI<br/>AGENTS
                 </h3>
                 <p className="mt-6 text-xl text-gray-400 font-mono border-l-2 border-[#CCFF00] pl-6 max-w-lg">
                   // İş gücünüzü dijitalleştirin. Hata payını sıfıra indirin. 7/24 çalışan otonom sistemler.
                 </p>
               </div>
             </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COL */}
        <motion.div style={{ y: yFast }} className="flex flex-col w-full gap-6 lg:w-5/12">
          
          <motion.div 
             className="relative w-full p-10 border border-white/10 bg-[#080808]/90 backdrop-blur-xl h-[400px] flex flex-col justify-center overflow-hidden group hover:border-[#CCFF00]/50 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none translate-y-[-100%] group-hover:translate-y-[100%]" />
            <h3 className="mb-8 text-4xl font-bold text-white uppercase font-clash">
              Neural<span className="text-[#CCFF00]">Link</span>
            </h3>
            <div className="flex flex-wrap gap-3">
               {['NOTION', 'PYTHON', 'GPT-4', 'CLAUDE 3', 'ZAPIER', 'STRIPE', 'SUPABASE'].map((item, i) => (
                  <div key={i} className="px-5 py-2 text-xs font-bold tracking-widest text-gray-300 uppercase border border-white/10 bg-white/5 hover:bg-[#CCFF00] hover:text-black hover:border-[#CCFF00] transition-colors cursor-crosshair">
                    {item}
                  </div>
               ))}
            </div>
          </motion.div>

          <div className="flex flex-col gap-6 sm:flex-row">
             <motion.div className="w-full sm:w-1/2 p-8 border border-white/10 bg-[#080808] relative group hover:border-[#CCFF00]/50 transition-colors h-[350px] flex flex-col justify-between">
                <div className="text-xs font-mono text-gray-500 uppercase">Total Revenue</div>
                <div className="text-5xl font-black text-white font-clash">$1M+</div>
                <div className="flex items-end h-32 gap-2 mt-4 pb-2 border-b border-white/10">
                  {[30, 50, 45, 70, 60, 90, 80].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i*0.1 }}
                      className="flex-1 bg-[#CCFF00] opacity-80 hover:opacity-100"
                    />
                  ))}
                </div>
             </motion.div>

             <motion.div className="w-full sm:w-1/2 border border-white/10 bg-[#0a0a0a] relative group hover:border-[#CCFF00]/50 transition-colors h-[350px] p-6 font-mono text-[10px] text-green-500/80 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#CCFF00] shadow-[0_0_20px_#CCFF00]" />
                <div className="mt-4 space-y-1 opacity-70">
                   <p>&gt; initiating handshake...</p>
                   <p>&gt; access granted [ROOT]</p>
                   <p>&gt; deploying agents...</p>
                   <p className="text-white">&gt; status: <span className="text-[#CCFF00] animate-pulse">OPTIMIZED</span></p>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="w-full h-[1px] bg-white/10 mb-2"/>
                  <div className="text-lg font-bold text-white font-clash uppercase">Hyper-UI</div>
                </div>
             </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;