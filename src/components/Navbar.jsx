import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  // Body scroll kilidi (Menu açıkken sayfa kaymasın)
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // veya 'hidden' yerine css'deki default
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const navLinks = ['Manifesto', 'Services', 'Process', 'Works'];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
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

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-black/50 backdrop-blur-md rounded-sm border border-white/10">
          {navLinks.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all">
              {item}
            </a>
          ))}
        </div>

        <button className="hidden md:block px-6 py-3 text-[10px] font-black text-[#CCFF00] border border-[#CCFF00] bg-transparent hover:bg-[#CCFF00] hover:text-black transition-all duration-300 tracking-widest uppercase">
          BOOK DEMO
        </button>

        {/* MOBILE HAMBURGER BUTTON */}
        <div 
          className="md:hidden flex flex-col gap-1.5 cursor-pointer z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div 
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} 
            className="w-8 h-0.5 bg-[#CCFF00] origin-center"
          />
          <motion.div 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }} 
            className="w-8 h-0.5 bg-[#CCFF00]"
          />
          <motion.div 
            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} 
            className="w-8 h-0.5 bg-[#CCFF00] origin-center" // self-end kaldırıldı, genişlik eşitlendi
          />
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed inset-0 z-[90] bg-blackflex flex-col items-center justify-center bg-[#050505]"
          >
             {/* Arka plan efekti */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black opacity-50 pointer-events-none" />

             <div className="flex flex-col items-center gap-8 relative z-10 w-full">
                {navLinks.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    onClick={() => setIsOpen(false)}
                    className="text-5xl font-black text-white uppercase font-clash hover:text-[#CCFF00] transition-colors"
                  >
                    {item}
                  </motion.a>
                ))}
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12"
                >
                  <button className="px-10 py-5 text-sm font-black text-black bg-[#CCFF00] uppercase tracking-widest hover:bg-white transition-colors">
                    BOOK DEMO
                  </button>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;