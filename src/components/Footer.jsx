import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative w-full bg-black border-t border-[#CCFF00]/20 pt-32 pb-10 overflow-hidden">
      
      {/* Grid Arka Plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      <div className="container px-6 mx-auto relative z-10">
        
        {/* ÜST KISIM: DEVASA CTA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-20">
           <div>
              <p className="text-[#CCFF00] font-mono mb-4 tracking-widest">// NEXT STEP</p>
              <h2 className="text-[10vw] font-black text-white uppercase font-clash leading-[0.8]">
                ACTIVATE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-white">FUTURE.</span>
              </h2>
           </div>
           
           <button className="mt-10 md:mt-0 px-12 py-6 bg-[#CCFF00] text-black text-xl font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all clip-path-slant">
              Start Project_
           </button>
        </div>

        {/* ORTA KISIM: DETAYLAR */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Kolon 1: Marka */}
            <div className="space-y-6">
               <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-[#CCFF00]" />
                  <span className="text-xl font-bold text-white font-clash tracking-tight">SENTIENT_AI</span>
               </div>
               <p className="text-gray-500 text-sm font-mono leading-relaxed">
                  Building the neural architecture of the next web. 
                  Automation, Intelligence, Dominance.
               </p>
            </div>

            {/* Kolon 2: Sitemap */}
            <div>
               <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-[#CCFF00] pl-2">Navigation</h4>
               <ul className="space-y-3 text-sm text-gray-400 font-mono">
                  {['Manifesto', 'Services', 'Process', 'Works'].map(item => (
                    <li key={item} className="hover:text-[#CCFF00] cursor-pointer transition-colors">./ {item}</li>
                  ))}
               </ul>
            </div>

            {/* Kolon 3: Socials */}
            <div>
               <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs border-l-2 border-[#CCFF00] pl-2">Connect</h4>
               <ul className="space-y-3 text-sm text-gray-400 font-mono">
                  <li><a href="https://www.linkedin.com/in/bekir-erdem/" className="hover:text-[#CCFF00]">LinkedIn ↗</a></li>
                  <li><a href="https://www.instagram.com/l3ekirerdem/" className="hover:text-[#CCFF00]">Instagram ↗</a></li>
                  <li><a href="https://x.com/l3ekirerdem" className="hover:text-[#CCFF00]">Twitter / X ↗</a></li>
               </ul>
            </div>

            {/* Kolon 4: Status */}
            <div className="bg-[#111] p-6 border border-white/5 rounded-sm">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500 font-mono uppercase">Systems Operational</span>
               </div>
               <div className="text-[10px] text-gray-600 font-mono space-y-1">
                  <p>CPU: 12% / MEM: 4GB</p>
                  <p>LOC: BURSA, TR</p>
                  <p>TIME: {new Date().toLocaleTimeString()}</p>
               </div>
            </div>
        </div>

        {/* ALT KISIM: COPYRIGHT */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest">
           <p>© 2025 SENTIENT SYSTEMS. ALL RIGHTS RESERVED.</p>
           <p>DESIGNED BY BEKIR ERDEM</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;