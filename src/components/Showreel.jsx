// src/components/Showreel.jsx
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Showreel = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[100vh] flex items-center justify-center bg-black overflow-hidden py-20">
      
      {/* Video Container */}
      <motion.div 
        style={{ scale, opacity }}
        className="relative w-[90%] h-[80%] rounded-[3rem] overflow-hidden border border-[#CCFF00]/30 shadow-[0_0_100px_rgba(204,255,0,0.1)]"
      >
        {/* Placeholder Video (Arka Plan) - Gerçek bir mp4 linki ile değiştirilebilir */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://cdn.pixabay.com/video/2019/04/20/22908-331623069_large.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-10 backdrop-blur-[2px]">
          <motion.div 
             initial={{ y: 50, opacity: 0 }}
             whileInView={{ y: 0, opacity: 1 }}
             transition={{ duration: 1 }}
          >
             <div className="w-20 h-20 rounded-full bg-[#CCFF00]/20 flex items-center justify-center backdrop-blur-md border border-[#CCFF00] mb-8 cursor-pointer hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-[#CCFF00] border-b-[10px] border-b-transparent ml-1" />
             </div>
             <h2 className="text-4xl md:text-7xl font-bold text-white font-clash uppercase tracking-tighter">
               Watch the <br/> Revolution
             </h2>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Showreel;