import { motion } from "framer-motion";
import { useEffect } from "react";

const ShowreelModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const assets = [
    {
      title: "Synapse",
      src: "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/Synapse.mp4",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Pal Affiliates",
      src: "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/Pal%20Affiliates.mp4",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Just4Fun",
      src: "https://owzleztogrxabkmqqqop.supabase.co/storage/v1/object/public/Assets/Just4Fun.mp4",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-[220] group flex items-center gap-3 text-white/50 hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-mono text-xs tracking-[0.2em] uppercase hidden md:block group-hover:tracking-[0.3em] transition-all">
          Close
        </span>
        <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:border-[#CCFF00] group-hover:text-[#CCFF00] transition-colors">
          ✕
        </div>
      </button>

      {/* Content Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative z-[210] w-full max-w-7xl h-full max-h-[85vh] grid grid-cols-1 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
      >
        {assets.map((asset, index) => (
          <div
            key={asset.title}
            className={`relative overflow-hidden rounded-xl bg-neutral-900 border border-white/5 group ${asset.className}`}
          >
            {/* Label */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] font-mono text-[#CCFF00] tracking-widest uppercase">
                {asset.title}
              </span>
            </div>

            {/* Video */}
            <video
              src={asset.src}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform duration-700"
              autoPlay
              muted
              loop
              playsInline
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ShowreelModal;
