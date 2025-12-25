import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 z-50 flex items-center justify-between w-full px-6 py-6 mix-blend-difference text-white"
    >
      {/* LOGO: Basit, Güçlü, Okunabilir */}
      <div className="flex items-center gap-3 select-none cursor-pointer">
        <div className="relative w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 bg-[#CCFF00] translate-y-full hover:translate-y-0 transition-transform duration-300"/>
           <div className="w-3 h-3 bg-[#CCFF00] rotate-45 z-10 hover:bg-black transition-colors" />
        </div>
        
        <div className="flex flex-col justify-center h-10">
           <span className="text-xl font-black tracking-tighter uppercase font-clash leading-[0.8]">
             SENTIENT
           </span>
           <span className="text-[9px] font-mono text-gray-400 tracking-[0.4em] uppercase">
             SYSTEMS
           </span>
        </div>
      </div>

      {/* MENÜ: Masaüstü */}
      <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
        {['Manifesto', 'Services', 'Process', 'Works'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-5 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all">
            {item}
          </a>
        ))}
      </div>

      {/* CTA BUTON */}
      <button className="hidden md:block px-6 py-3 text-[10px] font-black text-black bg-[#CCFF00] hover:bg-white transition-colors tracking-widest uppercase">
        Init_Project
      </button>

      {/* MOBİL MENÜ İKONU */}
      <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
        <div className="w-8 h-0.5 bg-white"/>
        <div className="w-5 h-0.5 bg-white"/>
      </div>
    </motion.nav>
  );
};

export default Navbar;