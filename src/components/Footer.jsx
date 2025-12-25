import { motion } from "framer-motion";

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/bekir-erdem/" },
  { name: "Instagram", url: "https://www.instagram.com/l3ekirerdem/" },
  { name: "Twitter / X", url: "https://x.com/l3ekirerdem" },
  { name: "GitHub", url: "#" } // GitHub varsa ekleyebiliriz
];

const sitemap = [
  { name: "Manifesto", href: "#manifesto" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Works", href: "#works" }
];

const Footer = () => {
  return (
    <footer className="relative w-full px-4 pt-40 pb-10 bg-black border-t border-white/10 overflow-hidden">
      
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)' , backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 flex flex-col justify-between max-w-[90rem] mx-auto min-h-[50vh]">
        
        {/* DEVASA BAŞLIK (CTA) */}
        <div className="flex flex-col gap-8">
            <h2 className="text-[12vw] font-black text-white uppercase font-clash leading-[0.8] tracking-tighter">
              READY TO <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-emerald-600">COLLABORATE?</span>
            </h2>
        </div>

        {/* LİNKLER & BİLGİ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-32 pt-10 border-t border-white/10">
            
            {/* SITEMAP */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-[0.2em]">[ SITEMAP ]</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                    {sitemap.map((item) => (
                      <li key={item.name}>
                        <a href={item.href} className="hover:text-white transition-colors">./ {item.name}</a>
                      </li>
                    ))}
                </ul>
            </div>

            {/* SOCIALS (GERÇEK LİNKLER) */}
            <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-[#CCFF00] uppercase tracking-[0.2em]">[ SOCIALS ]</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                    {socialLinks.map((item) => (
                        <li key={item.name}>
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-white transition-colors group flex items-center gap-2"
                          >
                            <span>./ {item.name}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                          </a>
                        </li>
                    ))}
                </ul>
            </div>
            
            {/* MARKA İMZASI */}
            <div className="col-span-2 text-right flex flex-col justify-end">
                <div className="text-3xl font-black text-white font-clash uppercase">SENTIENT_AI</div>
                <div className="text-[10px] text-gray-500 font-mono mt-2">
                   © 2025 // BEKIR ERDEM. ALL RIGHTS RESERVED.
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;