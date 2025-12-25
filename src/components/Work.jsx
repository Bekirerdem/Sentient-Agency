import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// HARİCİ GÖRSELLER (Dosya yüklemene gerek yok, hepsi internetten çalışır)
const projects = [
  { 
    title: "PALL_NET", 
    cat: "Web Experience", 
    images: [
      "https://images.unsplash.com/photo-1481437642641-2f0ae875f836?q=80&w=2670&auto=format&fit=crop", // Cyber Grid
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop", // Retro Tech
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"  // Chips
    ],
    link: "https://pall-net.vercel.app/"
  },
  { 
    title: "SYNAPSE", 
    cat: "Digital Exp.", 
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Network Globe
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop", // Energy Lines
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"  // AI Brain
    ],
    link: "https://synapse-digital-experience.vercel.app/"
  },
  { 
    title: "JUST4FUN", 
    cat: "Interactive / Gaming", 
    images: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2665&auto=format&fit=crop", // Neon Arcade
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2671&auto=format&fit=crop", // Controller
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"  // Cyber Room
    ],
    link: "https://just4-fun-bekirerdem.vercel.app/"
  }
];

const ProjectCard = ({ project, index }) => {
  const [activeImage, setActiveImage] = useState(0);

  const handleMouseMove = (e) => {
    const { width, left } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const imgIndex = Math.min(
      Math.floor((x / width) * project.images.length),
      project.images.length - 1
    );
    setActiveImage(imgIndex);
  };

  return (
    <a 
      href={project.link} 
      target="_blank" 
      rel="noopener noreferrer"
      className="relative w-[80vw] md:w-[50vw] h-[60vh] shrink-0 group cursor-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveImage(0)}
    >
        {/* Resim Container */}
        <div className="w-full h-full overflow-hidden border border-white/10 group-hover:border-[#CCFF00] transition-colors duration-300 bg-[#0a0a0a] relative">
          
          {/* Görseller */}
          {project.images.map((img, i) => (
            <img 
              key={i}
              src={img} 
              alt={`${project.title} - ${i}`} 
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-0 ${
                i === activeImage ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            />
          ))}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border border-[#CCFF00] bg-black/50 backdrop-blur-md flex flex-col items-center justify-center">
               <span className="text-[#CCFF00] font-bold text-xs uppercase tracking-widest">VISIT</span>
               <div className="flex gap-1 mt-1">
                 {project.images.map((_, i) => (
                   <div key={i} className={`w-1 h-1 rounded-full ${i === activeImage ? 'bg-[#CCFF00]' : 'bg-white/30'}`} />
                 ))}
               </div>
            </div>
          </div>
        </div>
        
        {/* Üst Bilgi */}
        <div className="absolute top-6 right-6 z-30 bg-black/80 backdrop-blur-md px-4 py-2 border border-white/20">
          <span className="text-[#CCFF00] font-mono text-xs uppercase tracking-widest">
            0{index+1} // {project.cat}
          </span>
        </div>
        
        <div className="absolute -bottom-14 left-0 z-30">
          <h3 className="text-5xl font-black text-white font-clash uppercase opacity-50 group-hover:opacity-100 group-hover:text-[#CCFF00] transition-all">
            {project.title}
          </h3>
        </div>
    </a>
  );
};

const Work = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} id="works" className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex items-center h-screen overflow-hidden">
        
        <div className="absolute bottom-10 left-10 z-20 mix-blend-difference pointer-events-none">
           <h2 className="text-7xl md:text-9xl font-black text-white font-clash uppercase leading-none">
             Selected <br/> <span className="text-transparent stroke-text">Works</span>
           </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-16 pl-[30vw] items-center">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
          
          <div className="w-[30vw] h-[60vh] shrink-0 flex items-center justify-center border-l border-white/10">
             <div className="text-right opacity-50">
                <div className="text-4xl font-black text-white uppercase font-clash">More<br/>Coming<br/>Soon</div>
             </div>
          </div>
        </motion.div>
      </div>
      
      <style>{`
        .stroke-text {
          -webkit-text-stroke: 1px #fff;
        }
      `}</style>
    </section>
  );
};

export default Work;