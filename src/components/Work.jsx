import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCursor } from "../context/CursorContext"; // EKLENDİ

const projects = [
  { 
    id: 1,
    title: "PALL_NET", 
    tagline: "IMMERSIVE COMMERCE ECOSYSTEM",
    desc: "Sıradan e-ticareti öldürdük. Müşteriyi içine çeken, nefes alan bir satış makinesi.",
    video: "/videos/pallnet.mp4", 
    link: "https://pall-net.vercel.app/",
    cursorType: "square" // ÖZEL CURSOR TİPİ
  },
  { 
    id: 2,
    title: "SYNAPSE", 
    tagline: "NEURAL NETWORK INTERFACE",
    desc: "Kullanıcı deneyimi değil, kullanıcı hipnozu. Veri akışını sanata dönüştürdük.",
    video: "/videos/synapse.mp4",
    link: "https://synapse-digital-experience.vercel.app/",
    cursorType: "triangle" // ÖZEL CURSOR TİPİ
  },
  { 
    id: 3,
    title: "JUST4FUN", 
    tagline: "GAMIFIED REALITY ENGINE",
    desc: "Sıkıcı kurumsal sitelere bir başkaldırı. Oyunlaştırma ile etkileşimi %400 artırdık.",
    video: "/videos/just4fun.mp4",
    link: "https://just4-fun-bekirerdem.vercel.app/",
    cursorType: "pentagon" // ÖZEL CURSOR TİPİ
  }
];

const ProjectCard = ({ project, index, setCursorVariant }) => {
  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      // EVENTLER BURAYA EKLENDİ
      onMouseEnter={() => setCursorVariant(project.cursorType)}
      onMouseLeave={() => setCursorVariant("default")}
      className="relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 group block border border-white/10 hover:border-[#CCFF00] transition-all duration-500 rounded-lg overflow-hidden bg-[#050505]"
    >
        <div className="w-full h-full relative">
          <video 
            src={project.video}
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-30 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20 flex flex-col justify-end h-full">
             <div className="flex items-center gap-4 mb-4">
               <span className="px-3 py-1 bg-[#CCFF00] text-black text-xs font-bold uppercase tracking-widest rounded-sm">
                 CASE 0{index+1}
               </span>
               <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">
                 // {project.tagline}
               </span>
             </div>
             <h3 className="text-5xl md:text-7xl font-black text-white font-clash uppercase leading-[0.85] mb-6 drop-shadow-lg">
               {project.title}
             </h3>
             <p className="text-gray-300 font-mono text-sm md:text-lg max-w-xl border-l-2 border-[#CCFF00] pl-6 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 bg-black/60 backdrop-blur-sm py-2 pr-4 rounded-r-lg">
               {project.desc}
             </p>
          </div>
        </div>
    </a>
  );
};

const Work = () => {
  const targetRef = useRef(null);
  const { setCursorVariant } = useCursor(); // CONTEXT BAĞLANTISI
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section ref={targetRef} id="works" className="relative h-[300vh] bg-black" style={{ position: "relative" }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 md:gap-16 pl-6 md:pl-24 items-center">
          
          {/* GİRİŞ BLOĞU */}
          <div 
            className="w-[80vw] md:w-[30vw] shrink-0 flex flex-col justify-center"
            onMouseEnter={() => setCursorVariant("text")} // GİRİŞTE TEXT CURSOR
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-[#CCFF00] animate-pulse" />
              <h2 className="text-sm font-bold text-[#CCFF00] font-mono uppercase tracking-widest">
                Selected Ecosystems
              </h2>
            </div>
            <h2 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter">
              Digital <br />
              <span className="text-transparent stroke-text hover:text-[#CCFF00] transition-colors duration-500" style={{ WebkitTextStroke: "2px white" }}>
                Reality
              </span>
            </h2>
            <p className="mt-8 text-gray-400 font-mono text-sm max-w-sm">
              [SCROLL DOWN TO EXPLORE]<br/>
              Biz web sitesi yapmıyoruz. Dijital varlıklar inşa ediyoruz.
            </p>
          </div>

          {/* PROJELER */}
          {projects.map((project, i) => (
            <ProjectCard 
              key={i} 
              project={project} 
              index={i} 
              setCursorVariant={setCursorVariant} 
            />
          ))}

          {/* ARŞİV KARTI (WORKFORCE) -> DIAMOND TETİKLEYİCİ */}
          <div 
            className="w-[80vw] md:w-[25vw] h-[60vh] md:h-[70vh] shrink-0 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-[#CCFF00] hover:text-black transition-colors group cursor-pointer rounded-lg"
            onMouseEnter={() => setCursorVariant("diamond")} // İŞTE BU KOD EKSİKTİ
            onMouseLeave={() => setCursorVariant("default")}
          >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-black font-clash uppercase mb-4 group-hover:text-black text-white transition-colors">Archive</div>
                <div className="inline-block px-6 py-3 border border-[#CCFF00] text-[#CCFF00] group-hover:border-black group-hover:text-black uppercase font-bold tracking-widest text-xs transition-colors">
                  View Full Index
                </div>
              </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Work;