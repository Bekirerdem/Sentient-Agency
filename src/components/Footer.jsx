import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="contact" className="relative w-full bg-[#020202] pt-32 pb-10 overflow-hidden text-white">
      
      {/* Grid Arka Plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      {/* CONTACT CTA SECTION - MINIMALIST */}
      <div className="container mx-auto px-6 mb-32 relative z-10 flex flex-col items-center text-center">
         <p className="text-[#CCFF00] font-mono text-xs tracking-[0.5em] mb-6 uppercase">
            // Start The Conversation
         </p>
         <h2 className="text-6xl md:text-9xl font-black font-clash uppercase leading-none tracking-tighter mb-12 mix-blend-difference">
            Let's Build <br/> The Future
         </h2>
         <a 
           href="mailto:hello@sentient.agency" 
           className="px-12 py-6 border border-[#CCFF00] text-[#CCFF00] font-bold uppercase tracking-[0.2em] hover:bg-[#CCFF00] hover:text-black transition-all duration-300 clip-path-slant"
         >
            Email Us
         </a>
      </div>

      <div className="container px-6 mx-auto relative z-10">
        
        {/* ÜST KISIM: DEVASA CTA */}


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