import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const steps = [
  { 
    id: "01", 
    title: "System Audit", 
    desc: "Mevcut kaosun dijital röntgenini çekiyoruz. Veri kaçaklarını anında tespit ediyoruz.",
    cmd: "> sudo analyze_root",
    status: "DETECTING..."
  },
  { 
    id: "02", 
    title: "Architecture", 
    desc: "Size özel yapay zeka nöral ağını örüyoruz. Standart yok, terzi işi mimari var.",
    cmd: "> import neural_net",
    status: "BUILDING..."
  },
  { 
    id: "03", 
    title: "Deployment", 
    desc: "Ajanları sisteme enjekte ediyoruz. Eski dünya kapanıyor, otomasyon başlıyor.",
    cmd: "> deploy --force",
    status: "LIVE"
  },
  { 
    id: "04", 
    title: "Evolution", 
    desc: "Sistem kendi kendine öğreniyor. Siz uyurken o kendini optimize ediyor.",
    cmd: "> auto_scale = TRUE",
    status: "EVOLVING"
  },
];

const Process = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} id="process" className="relative h-[300vh] bg-[#080808]">
      <div className="sticky top-0 flex items-center h-screen overflow-hidden border-t border-white/5">
        
        {/* Sol Sabit Başlık */}
        <div className="absolute top-12 left-8 z-10 mix-blend-difference md:left-20">
           <h2 className="text-[#CCFF00] font-clash font-black text-5xl uppercase tracking-tighter">
             The<br/>Algorithm
           </h2>
           <div className="flex items-center gap-2 mt-4 text-xs font-mono text-gray-500">
              <div className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse"/>
              <span>EXECUTION_PROTOCOL_V.1</span>
           </div>
        </div>

        {/* YATAY KAYAN KARTLAR */}
        <motion.div style={{ x }} className="flex gap-0 pl-[10vw] md:pl-[25vw]">
          {steps.map((step, i) => (
            <div key={step.id} className="relative w-[85vw] md:w-[60vw] h-[100vh] flex flex-col justify-center px-8 md:px-24 border-r border-white/5 shrink-0 bg-[#080808] group overflow-hidden hover:bg-[#CCFF00]/5 transition-colors duration-500">
               
               {/* 1. KATMAN: Arka Plan Teknik Çizim (Grid & Crosshair) */}
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="absolute top-10 right-10 w-32 h-32 border-r border-t border-[#CCFF00] rounded-tr-3xl" />
                  <div className="absolute bottom-20 left-20 w-full h-[1px] bg-gradient-to-r from-transparent via-[#CCFF00] to-transparent" />
               </div>

               {/* 2. KATMAN: Dinamik Kod Dekoru */}
               <div className="absolute top-1/3 right-12 font-mono text-[10px] text-[#CCFF00]/40 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity delay-200">
                  <p>{step.cmd}</p>
                  <p className="mt-1 text-white/20">memory_usage: 124mb</p>
                  <p className="mt-1 text-white/20">threads: 8 active</p>
               </div>

               {/* 3. KATMAN: İçerik */}
               <div className="relative z-10">
                  {/* Devasa Numara */}
                  <div className="text-[12rem] font-black text-white/5 font-clash leading-none absolute -top-24 -left-10 select-none group-hover:text-[#CCFF00]/10 transition-colors duration-500">
                    {step.id}
                  </div>
                  
                  {/* Status Işığı */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${i % 2 === 0 ? 'bg-[#CCFF00]' : 'bg-white'} shadow-[0_0_10px_currentColor]`} />
                    <span className="text-[10px] md:text-xs font-mono text-[#CCFF00] border border-[#CCFF00]/30 px-2 py-1 rounded">
                      STATUS: {step.status}
                    </span>
                  </div>

                  <h3 className="text-5xl md:text-7xl font-black text-white mb-8 font-clash uppercase leading-[0.9] group-hover:translate-x-4 transition-transform duration-500">
                    {step.title}
                  </h3>
                  
                  <div className="relative pl-6 border-l-2 border-white/10 group-hover:border-[#CCFF00] transition-colors duration-500">
                    <p className="text-gray-400 text-lg md:text-2xl font-mono leading-relaxed max-w-lg">
                      {step.desc}
                    </p>
                  </div>
               </div>
            </div>
          ))}
          
          {/* Bitiş Ekranı */}
          <div className="w-[80vw] h-screen shrink-0 flex items-center justify-center bg-black border-r border-white/5">
             <div className="text-center">
                <div className="text-6xl font-black text-white uppercase font-clash mb-4">
                  System<br/><span className="text-[#CCFF00]">Ready</span>
                </div>
                <div className="text-xs font-mono text-gray-500">
                  [ WAITING FOR INPUT ]
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Process;