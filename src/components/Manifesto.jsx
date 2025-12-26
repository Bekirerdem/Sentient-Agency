// src/components/Manifesto.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Manifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scroll'a bağlı hareket (Biri sağa, biri sola)
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section id="manifesto" ref={containerRef} className="relative w-full py-40 bg-[#050505] overflow-hidden flex flex-col justify-center gap-10" style={{ position: "relative" }}>
      
      {/* Arka Plan Gürültüsü */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }} />

      <div className="container px-4 mx-auto mb-20 text-center">
         <p className="text-[#CCFF00] font-mono text-xs tracking-[0.5em] mb-4 uppercase">
            // The Problem
         </p>
         <h2 className="text-3xl md:text-5xl font-medium text-white font-clash leading-tight max-w-4xl mx-auto mb-8">
           Manuel iş gücü, modern çağın <span className="text-gray-500 line-through decoration-[#CCFF00]">köleliğidir.</span> <br/>
           Biz, kaosunuzu <span className="text-[#CCFF00] border-b border-[#CCFF00]">verimliliğe</span> dönüştürüyoruz.
         </h2>
         <p className="max-w-2xl mx-auto text-gray-400 font-manrope text-sm md:text-base leading-relaxed">
            Eski dünya, yavaş ve hataya açık süreçlerle can çekişiyor. 
            Biz, işletmenizin DNA'sına otonom yapay zeka ajanlarını entegre ederek verimsizliği yok ediyoruz. 
            Gelecek beklemez; ya adapte olursunuz ya da yok olursunuz.
         </p>
      </div>

      {/* Kinetik Tipografi (Kayan Devasa Yazılar) */}
      <div className="relative flex flex-col gap-4 opacity-80 mix-blend-difference">
        {/* Satır 1: Sola Kayan */}
        <motion.div style={{ x: xLeft }} className="flex gap-8 whitespace-nowrap">
           <h3 className="text-[10vw] font-black text-transparent stroke-text font-clash uppercase leading-none">
             KILL THE ROUTINE KILL THE ROUTINE
           </h3>
           <h3 className="text-[10vw] font-black text-[#CCFF00] font-clash uppercase leading-none">
             KILL THE ROUTINE
           </h3>
        </motion.div>

        {/* Satır 2: Sağa Kayan */}
        <motion.div style={{ x: xRight }} className="flex gap-8 whitespace-nowrap">
           <h3 className="text-[10vw] font-black text-white font-clash uppercase leading-none">
             AUTOMATE REALITY
           </h3>
           <h3 className="text-[10vw] font-black text-transparent stroke-text font-clash uppercase leading-none">
             AUTOMATE REALITY AUTOMATE REALITY
           </h3>
        </motion.div>
      </div>

      {/* Görsel Stil Tanımı (Stroke Text için) */}
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 2px rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </section>
  );
};

export default Manifesto;