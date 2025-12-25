import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      // Z-INDEX ARTIRILDI (z-50 -> z-[100]) ve Backdrop Blur eklendi
      className="fixed top-0 left-0 z-[100] flex items-center justify-between w-full px-6 py-4 mix-blend-difference text-white bg-black/10 backdrop-blur-sm border-b border-white/5"
    >
      <div className="flex items-center gap-3 select-none cursor-pointer group">
        <div className="relative w-10 h-10 border border-[#CCFF00]/30 flex items-center justify-center overflow-hidden bg-black">
           <div className="w-full h-full bg-[#CCFF00] absolute translate-y-full group-hover:translate-y-0 transition-transform duration-300"/>
           <div className="w-2 h-2 bg-[#CCFF00] rotate-45 z-10 group-hover:bg-black transition-colors" />
        </div>
        
        <div className="flex flex-col leading-none">
           <span className="text-xl font-black tracking-tighter uppercase font-clash">
             <span className="text-white font-bold">SENT</span>
             <span className="text-[#CCFF00] italic font-mono">IENT</span>
           </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1 p-1 bg-black/50 backdrop-blur-md rounded-sm border border-white/10">
        {['Manifesto', 'Services', 'Process', 'Works'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all">
            {item}
          </a>
        ))}
      </div>

      <button className="hidden md:block px-6 py-3 text-[10px] font-black text-[#CCFF00] border border-[#CCFF00] bg-transparent hover:bg-[#CCFF00] hover:text-black transition-all duration-300 tracking-widest uppercase">
        BOOK DEMO
      </button>

      <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
        <div className="w-8 h-0.5 bg-[#CCFF00]"/>
        <div className="w-5 h-0.5 bg-[#CCFF00] self-end"/>
      </div>
    </motion.nav>
  );
};

export default Navbar;