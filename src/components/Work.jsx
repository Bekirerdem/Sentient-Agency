import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useCursor } from "../context/CursorContext";
import { supabase } from "../lib/supabaseClient";

const CURSOR_TYPES = ["square", "triangle", "pentagon"];

const ProjectCard = ({ project, index, setCursorVariant }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "0px 0px -20% 0px", once: false });

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    } else if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={containerRef}
      className="relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 group block border border-white/10 hover:border-[#CCFF00] transition-all duration-500 rounded-lg overflow-hidden bg-[#050505]"
      onMouseEnter={() => setCursorVariant(CURSOR_TYPES[index % CURSOR_TYPES.length])}
      onMouseLeave={() => setCursorVariant("default")}
    >
        <div className="w-full h-full relative">
          <video 
            ref={videoRef}
            src={project.video_url}
            muted 
            loop 
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-30 transition-opacity duration-500" />

          <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full z-20 flex flex-col justify-end h-full">
             <div className="flex items-center gap-4 mb-4">
               <span className="px-3 py-1 bg-[#CCFF00] text-black text-xs font-bold uppercase tracking-widest rounded-sm">
                 CASE 0{index+1}
               </span>
               <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-300">
                 // {project.category}
               </span>
             </div>
             <h3 className="text-5xl md:text-7xl font-black text-white font-clash uppercase leading-[0.85] mb-6 drop-shadow-lg">
               {project.title}
             </h3>
             {/* Description removed as it's not in the new schema, keeping UI clean */}
          </div>
        </div>
    </a>
  );
};

const Work = () => {
  const targetRef = useRef(null);
  const { setCursorVariant } = useCursor(); 
  
  const [isMobile, setIsMobile] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('id');
      if (data) setProjects(data);
      if (error) console.error('Error fetching projects:', error);
    };
    fetchProjects();
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const xRange = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);
  const x = isMobile ? 0 : xRange;

  return (
    <section 
      ref={targetRef} 
      id="works" 
      className="relative bg-black h-auto md:h-[300vh]" 
      style={{ position: "relative" }}
    >
      <div className="relative md:sticky top-0 flex flex-col md:flex-row h-auto md:h-screen items-start md:items-center overflow-visible md:overflow-hidden py-20 md:py-0">
        <motion.div 
          style={{ x }} 
          className="flex flex-col md:flex-row gap-20 md:gap-16 px-6 md:pl-24 items-center w-full md:w-auto"
        >
          
          {/* GİRİŞ BLOĞU */}
          <div 
            className="w-full md:w-[30vw] shrink-0 flex flex-col justify-center text-center md:text-left"
            onMouseEnter={() => setCursorVariant("text")} 
            onMouseLeave={() => setCursorVariant("default")}
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
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
            <p className="mt-8 text-gray-400 font-mono text-sm max-w-sm mx-auto md:mx-0">
              [SCROLL DOWN TO EXPLORE]<br/>
              Biz web sitesi yapmıyoruz. Dijital varlıklar inşa ediyoruz.
            </p>
          </div>

          {/* PROJELER */}
          {projects.map((project, i) => (
            <div key={project.id || i} className="w-full md:w-auto flex justify-center">
                <ProjectCard 
                project={project} 
                index={i} 
                setCursorVariant={setCursorVariant} 
                />
            </div>
          ))}

          {/* ARŞİV KARTI */}
          <div 
            className="w-full md:w-[25vw] h-[40vh] md:h-[70vh] shrink-0 flex items-center justify-center border border-white/10 bg-white/5 hover:bg-[#CCFF00] hover:text-black transition-colors group cursor-pointer rounded-lg"
            onMouseEnter={() => setCursorVariant("diamond")} 
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