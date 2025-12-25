import React from 'react';
import { motion } from 'framer-motion';
import { useCursor } from '../context/CursorContext';

const VALID_NAV_ITEMS = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const { setCursorVariant } = useCursor();

  return (
    <>
      {/* Top Left - Logo */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-8 z-50 mix-blend-difference text-white cursor-none"
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <span className="font-monument font-bold text-xl tracking-tighter">META<span className="text-neon-green">RÜYA</span>_AI</span>
      </motion.div>

      {/* Top Right - Menu */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 right-8 z-50 flex gap-8 mix-blend-exclusion text-white"
      >
        {VALID_NAV_ITEMS.map((item, index) => (
          <a 
            key={index} 
            href={item.href} 
            className="group relative hidden md:block overflow-hidden cursor-none"
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
          >
            <span className="relative z-10 block transition-transform duration-500 group-hover:-translate-y-[120%]">{item.label}</span>
            <span className="absolute top-0 left-0 block translate-y-[120%] transition-transform duration-500 group-hover:translate-y-0 text-neon-green">{item.label}</span>
          </a>
        ))}
        <button 
          className="md:hidden text-2xl cursor-none"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          ☰
        </button>
      </motion.div>

      {/* Bottom Left - Socials */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 left-8 z-50 hidden md:flex gap-4 mix-blend-exclusion text-white text-sm"
      >
        <a href="#" className="hover:text-neon-green transition-colors cursor-none" onMouseEnter={() => setCursorVariant("hover")} onMouseLeave={() => setCursorVariant("default")}>IG</a>
        <a href="#" className="hover:text-neon-green transition-colors cursor-none" onMouseEnter={() => setCursorVariant("hover")} onMouseLeave={() => setCursorVariant("default")}>TW</a>
        <a href="#" className="hover:text-neon-green transition-colors cursor-none" onMouseEnter={() => setCursorVariant("hover")} onMouseLeave={() => setCursorVariant("default")}>LI</a>
      </motion.div>

      {/* Bottom Right - CTA */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 right-8 z-50 mix-blend-exclusion"
      >
        <button 
          className="border border-white/20 px-6 py-2 rounded-full text-white text-sm hover:bg-neon-green hover:text-black hover:border-neon-green transition-all duration-300 cursor-none"
          onMouseEnter={() => setCursorVariant("hover")}
          onMouseLeave={() => setCursorVariant("default")}
        >
          START PROJECT
        </button>
      </motion.div>
    </>
  );
};

export default Navigation;
