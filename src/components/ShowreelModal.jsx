import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- AMBIENCE AUDIO (Heartbeat / Underwater) ---
const HeartbeatAmbience = () => {
    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        // Create a Lowpass Filter for "Underwater" feel
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 150; 
        filter.connect(ctx.destination);

        // Heartbeat Sound Generator
        const playPulse = (time) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.frequency.setValueAtTime(45, time); // Low thud
            osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);
            
            gain.gain.setValueAtTime(0.5, time);
            gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
            
            osc.connect(gain);
            gain.connect(filter);
            
            osc.start(time);
            osc.stop(time + 0.2);
        };

        // Scheduler for heartbeat rhythm (lub-dub ....... lub-dub)
        let nextTime = ctx.currentTime + 0.1;
        const schedule = () => {
            if (ctx.state === 'closed') return;
            
            // Lub
            playPulse(nextTime);
            // Dub
            playPulse(nextTime + 0.15);
            
            // Next heartbeat in 1.2 seconds roughly
            nextTime += 1.2;
            
            // Background Drone (Perpetual low hum)
            // We'll just re-trigger or keep a constant oscillator if we wanted, 
            // but the prompt asked for "Deep Underwater/Heartbeat".
            // Let's add a very subtle constant drone.
            if (!droneStarted) {
               startDrone(ctx, filter);
               droneStarted = true;
            }
            
            timeoutId = setTimeout(schedule, 1000);
        };
        
        // Drone logic
        let droneStarted = false;
        const startDrone = (context, dest) => {
            const osc = context.createOscillator();
            const gain = context.createGain();
            osc.type = 'sine';
            osc.frequency.value = 35;
            gain.gain.value = 0.15;
            osc.connect(gain);
            gain.connect(dest);
            osc.start();
        };

        let timeoutId = setTimeout(schedule, 100);

        return () => {
            clearTimeout(timeoutId);
            ctx.close();
        };
    }, []);

    return null;
};

// --- MAIN COMPONENT ---
const ShowreelModal = ({ isOpen, onClose }) => {
  const [activeVideo, setActiveVideo] = useState("bloom"); // 'bloom' or 'seed'
  
  const bloomRef = useRef(null);
  const seedRef = useRef(null);

  const bloomUrl = "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/bloom.mp4";
  const seedUrl = "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/seed.mp4";

  // Handle Sequence Logic
  const handleBloomEnded = () => {
      // Bloom finished, play Seed
      if (seedRef.current) {
          seedRef.current.currentTime = 0;
          seedRef.current.play().then(() => {
              setActiveVideo("seed");
              // Reset bloom for next time
             // if (bloomRef.current) bloomRef.current.pause(); 
          });
      }
  };

  const handleSeedEnded = () => {
      // Seed finished, loop back to Bloom
      if (bloomRef.current) {
          bloomRef.current.currentTime = 0;
          bloomRef.current.play().then(() => {
              setActiveVideo("bloom");
              // Reset seed
             // if (seedRef.current) seedRef.current.pause();
          });
      }
  };

  // Close Logic
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      
      // Initial Play
      // setTimeout to ensure ref is mounted
      setTimeout(() => {
         if (bloomRef.current) bloomRef.current.play();
      }, 100);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black overflow-hidden backdrop-blur-3xl">
      
      {/* AMBIENCE */}
      <HeartbeatAmbience />

      {/* SCANLINE / NOISE OVERLAY */}
      <div 
        className="absolute inset-0 z-[205] pointer-events-none opacity-30 mix-blend-overlay"
        style={{
            backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 1px,
                #000 2px,
                #000 3px
            ), url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* VIGNETTE */}
      <div className="absolute inset-0 z-[205] pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,#000000_100%)]" />

      {/* VIDEO CONTAINER */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center"
      >
          {/* BLOOM PLAYBACK */}
          <video
             ref={bloomRef}
             src={bloomUrl}
             className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-0 ${activeVideo === 'bloom' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             muted // Auto-play usually requires muted usually, but this is a user-initiated modal so we might get away with sound if we added it, but prompt says "Ambience sound", doesn't specify video sound.
             playsInline
             onEnded={handleBloomEnded}
          />

          {/* SEED PLAYBACK */}
          <video
             ref={seedRef}
             src={seedUrl}
             className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-0 ${activeVideo === 'seed' ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
             muted 
             playsInline
             onEnded={handleSeedEnded}
          />
          
          {/* DECORATIVE HUD TEXT */}
          <div className="absolute bottom-10 left-10 z-[210] font-mono text-[#CCFF00] text-xs tracking-widest opacity-70">
              SEQUENCE: {activeVideo === 'bloom' ? 'PHASE_1_INCUBATION' : 'PHASE_2_MITOSIS'}
              <br/>
              STATUS: LIVE_RENDERING
          </div>

      </motion.div>

      {/* CLOSE BUTTON */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-[220] group flex items-center gap-3 cursor-pointer"
      >
          <span className="font-mono text-[#CCFF00] text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
              ABORT SEQUENCE
          </span>
          <div className="w-12 h-12 bg-black/50 border border-[#CCFF00] text-[#CCFF00] flex items-center justify-center rounded-sm hover:bg-[#CCFF00] hover:text-black transition-all duration-300">
              ✕
          </div>
      </button>

    </div>
  );
};

export default ShowreelModal;
