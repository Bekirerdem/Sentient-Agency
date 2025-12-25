import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      
      {/* LOCAL VIDEO: sentient.mp4 */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          {/* Eğer sentient.mp4 yoksa video oynamaz ama hata da vermez */}
          <source src="/sentient.mp4" type="video/mp4" />
        </video>

        {/* Video yoksa/yüklenmezse diye SİYAH FON (Pixabay linki YOK) */}
        <div className="absolute inset-0 bg-black -z-10" />

        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-black/90" />
      </div>

      {/* İÇERİK */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 pointer-events-none">
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2 }}
           className="text-center z-20 flex flex-col items-center"
        >
          <h1 className="text-[12vw] font-black text-white leading-[0.9] tracking-tight font-clash">
            SENTIENT
          </h1>
          <h1 className="text-[12vw] font-black text-transparent leading-[0.9] tracking-tight font-clash bg-clip-text bg-gradient-to-b from-[#CCFF00] to-transparent">
            REALITY
          </h1>
          
          <p className="mt-6 text-sm md:text-lg tracking-[0.2em] font-mono text-white/80 uppercase max-w-2xl text-center">
            ARCHITECTING THE POST-LABOR ECONOMY THROUGH AUTONOMOUS AGENTS.
          </p>

          <button className="mt-12 px-8 py-4 bg-[#CCFF00] text-black font-black text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-colors pointer-events-auto clip-path-slant">
            INITIATE PROTOCOL
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;