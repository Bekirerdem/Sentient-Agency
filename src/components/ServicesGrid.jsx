import React from "react";
import { motion } from "framer-motion";
import { useCursor } from "../context/CursorContext";

// --- ORİJİNAL İÇERİK HAVUZU ---
const techStack = [
  "GEMINI 3", "ANTIGRAVITY", "REPLIT", "NODE.JS", "CURSOR",
  "REACT", "N8N", "SUPABASE", "OPENAI", "TAILWIND"
];

const ServicesGrid = () => {
  const { setCursorVariant } = useCursor();

  return (
    <section id="services" className="w-full bg-black py-32 px-6">
      <div className="container mx-auto max-w-[90vw]">
        
        {/* BENTO GRID YAPISI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-[80vh]">
          
          {/* KUTU 1: AI WORKFORCE (SOL BÜYÜK) */}
          {/* DÜZELTME: Cursor artık "diamond" (Elmas) */}
          <div 
            className="lg:col-span-2 relative border border-white/10 bg-[#050505] p-12 flex flex-col justify-end overflow-hidden group hover:border-[#CCFF00]/50 transition-colors duration-500"
            onMouseEnter={() => setCursorVariant("diamond")} 
            onMouseLeave={() => setCursorVariant("default")}
          >
            {/* Arkaplan Efekti */}
            <div className="absolute top-10 right-10 w-20 h-20 rounded-full border border-[#CCFF00]/20 animate-spin-slow" />
            
            {/* Dekoratif Çizgiler */}
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(#CCFF00_1px,transparent_1px)] [background-size:20px_20px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative z-10">
               <div className="inline-block px-3 py-1 border border-[#CCFF00] text-[#CCFF00] text-xs font-mono mb-6">
                  AGENTS_DEPLOYED: 42
               </div>
               <h3 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4">
                 AI Integrated <br/> Design
               </h3>
               <p className="text-gray-400 max-w-md border-l-2 border-[#CCFF00] pl-6 py-2">
                 Generative UI systems that adapt to user behavior in real-time. The interface is no longer static; it lives.
               </p>
            </div>
          </div>

          {/* SAĞ SÜTUN */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            
            {/* KUTU 2: NEURAL ARCHITECTURE (SAĞ ÜST) */}
            {/* DÜZELTME: Marquee silindi, Orijinal Butonlar Geri Geldi */}
            <div 
              className="flex-1 border border-white/10 bg-[#050505] p-8 flex flex-col overflow-hidden relative group hover:border-[#CCFF00]/50 transition-colors duration-500"
              onMouseEnter={() => setCursorVariant("triangle")}
              onMouseLeave={() => setCursorVariant("default")}
            >
               <div className="absolute top-4 right-4 text-[#CCFF00]">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2zm0 4l6 14H6l6-14z"/></svg>
               </div>
               
               <h3 className="text-3xl font-bold text-white uppercase mb-4">Next-Gen Web Architecture</h3>
               <p className="text-xs text-gray-500 font-mono mb-4">High-performance, scalable ecosystems built for the Web3 era.</p>
               
               {/* TAG CLOUD (UPDATED) */}
               <div className="flex flex-wrap gap-3 content-start">
                  {["N8N", "TYPESCRIPT", "NEXT.JS", "REACT-NATIVE", "REPLIT-DESIGN", "NODE.JS", "UNICORN.STUDIO"].map((tech, i) => (
                    <div 
                      key={i}
                      className="px-3 py-1 border border-[#CCFF00]/30 text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all cursor-default"
                    >
                      {tech}
                    </div>
                  ))}
               </div>

               {/* Alt Dekorasyon */}
               <div className="absolute bottom-4 right-4 text-[#CCFF00]/20 font-mono text-xs">
                  // OPTIMIZED
               </div>
            </div>

            {/* KUTU 3: ROI METRICS (SAĞ ALT) */}
            <div 
              className="h-[300px] border border-white/10 bg-[#050505] p-8 flex flex-col justify-between group hover:border-[#CCFF00]/50 transition-colors duration-500"
              onMouseEnter={() => setCursorVariant("pentagon")}
              onMouseLeave={() => setCursorVariant("default")}
            >
               <div className="text-xs font-mono text-gray-500 uppercase">Digital Strategy</div>
               
               <div>
                 <h3 className="text-4xl font-black text-white mb-2 uppercase">Dominance</h3>
                 <p className="text-xs text-gray-400">Data-driven roadmaps to crush competition through automation.</p>
                 
                 {/* İlerleme Çubuğu */}
                 <div className="w-full h-1 bg-gray-800 mt-4 overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: "100%" }}
                     transition={{ duration: 1.5, delay: 0.2 }}
                     className="h-full bg-[#CCFF00]"
                   />
                 </div>
               </div>

               <div className="flex justify-between text-xs font-mono text-gray-400 mt-4">
                  <span>Growth: +850%</span>
                  <span className="text-[#CCFF00]">Risk: MINIMAL</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;