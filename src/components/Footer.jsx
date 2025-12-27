import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer id="contact" className="relative w-full bg-[#020202] pt-32 pb-10 overflow-hidden text-white">
      
      {/* Grid Arka Plan */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />

      {/* CONTACT CTA SECTION */}
      <div className="container mx-auto px-6 mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <p className="text-[#CCFF00] font-mono text-xs tracking-[0.3em] mb-4 uppercase">
                    // Ready to Evolve?
                </p>
                <h2 className="text-5xl md:text-7xl font-black font-clash uppercase leading-[0.9] mb-8">
                    LET'S BUILD <br/> THE <span className="text-transparent stroke-text-white">IMPOSSIBLE</span>
                </h2>
                <p className="text-gray-400 max-w-md mb-8">
                    Stop competing. Start dominating. Tell us about your vision.
                </p>
                <a href="mailto:hello@sentient.agency" className="inline-block px-10 py-5 bg-[#CCFF00] text-black font-bold uppercase tracking-widest hover:bg-white transition-colors">
                    Start a Project
                </a>
            </div>

            {/* CONTACT FORM - RE-DESIGNED (MINIMAL / TERMINAL STYLE) */}
            <div className="w-full">
                <form className="flex flex-col gap-8">
                    
                    <div className="group relative">
                        <input type="text" placeholder=" " className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-xl font-mono focus:border-[#CCFF00] focus:outline-none transition-colors" />
                        <label className="absolute left-0 top-4 text-gray-500 text-sm font-mono transition-all peer-focus:-top-4 peer-focus:text-[#CCFF00] peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                           // ENTER_IDENTITY
                        </label>
                    </div>

                    <div className="group relative">
                        <input type="email" placeholder=" " className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-xl font-mono focus:border-[#CCFF00] focus:outline-none transition-colors" />
                        <label className="absolute left-0 top-4 text-gray-500 text-sm font-mono transition-all peer-focus:-top-4 peer-focus:text-[#CCFF00] peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                           // SIGNAL_FREQUENCY (EMAIL)
                        </label>
                    </div>

                    <div className="group relative">
                         <textarea rows="1" placeholder=" " className="peer w-full bg-transparent border-b border-gray-800 py-4 text-white text-xl font-mono focus:border-[#CCFF00] focus:outline-none transition-colors resize-none h-14 min-h-[56px]"></textarea>
                         <label className="absolute left-0 top-4 text-gray-500 text-sm font-mono transition-all peer-focus:-top-4 peer-focus:text-[#CCFF00] peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs">
                            // TRANSMISSION_DATA
                         </label>
                    </div>

                    <button type="submit" className="self-start mt-4 px-8 py-4 border border-[#CCFF00] text-[#CCFF00] font-bold uppercase tracking-widest hover:bg-[#CCFF00] hover:text-black transition-all flex items-center gap-4 group">
                        <span className="group-hover:translate-x-1 transition-transform">INITIALIZE</span>
                        <span className="text-xl">→</span>
                    </button>
                </form>
            </div>
        </div>
      </div>

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