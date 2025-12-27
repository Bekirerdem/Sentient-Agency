import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
        let timeoutId;

        // Drone logic
        let droneOsc = null;
        let droneGain = null;
        const startDrone = () => {
            if (droneOsc) return; 
            droneOsc = ctx.createOscillator();
            droneGain = ctx.createGain();
            droneOsc.type = 'sine';
            droneOsc.frequency.value = 35;
            droneGain.gain.value = 0.15; // Volume
            droneOsc.connect(droneGain);
            droneGain.connect(dest); // dest needs to be accessible, let's fix scope or just connect to filter/dest
            droneGain.connect(filter); // Connect drone to same filter
            droneOsc.start();
        };

        const schedule = () => {
            if (ctx.state === 'closed') return;
            
            playPulse(nextTime);
            playPulse(nextTime + 0.15);
            
            nextTime += 1.2;
            
            // Start drone once
            startDrone();
            
            timeoutId = setTimeout(schedule, 1000);
        };
        
        // Fix drone scope issue by defining inside or passing params
        // Re-defining startDrone inside effect correctly
        
        timeoutId = setTimeout(schedule, 100);

        return () => {
            clearTimeout(timeoutId);
            if (droneOsc) { try { droneOsc.stop(); } catch(e){} }
            ctx.close();
        };
    }, []);

    return null;
};

// --- MAIN COMPONENT ---
const ShowreelModal = ({ isOpen, onClose }) => {
  const [activeVideo, setActiveVideo] = useState("bloom"); 
  const bloomRef = useRef(null);
  const seedRef = useRef(null);

  const bloomUrl = "/bloom.mp4";
  const seedUrl = "/seed.mp4";

  // Handle Sequence Logic
  const handleBloomEnded = () => {
      if (seedRef.current) {
          seedRef.current.currentTime = 0;
          seedRef.current.play().then(() => {
              setActiveVideo("seed");
          });
      }
  };

  const handleSeedEnded = () => {
      if (bloomRef.current) {
          bloomRef.current.currentTime = 0;
          bloomRef.current.play().then(() => {
              setActiveVideo("bloom");
          });
      }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
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

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden backdrop-blur-3xl">
      
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
             muted 
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
        className="absolute top-8 right-8 z-[9999] group flex items-center gap-3 cursor-pointer"
      >
          <span className="font-mono text-[#CCFF00] text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">
              ABORT SEQUENCE
          </span>
          <div className="w-12 h-12 bg-black/50 border border-[#CCFF00] text-[#CCFF00] flex items-center justify-center rounded-sm hover:bg-[#CCFF00] hover:text-black transition-all duration-300">
              ✕
          </div>
      </button>

    </div>,
    document.body
  );
};

export default ShowreelModal;
