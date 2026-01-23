"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../context/PlayerContext";
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaCompressArrowsAlt } from "react-icons/fa";

export default function GlobalPlayer() {
  const { 
    isPlayerVisible, isPlayerExpanded, setIsPlayerExpanded, 
    isPlaying, togglePlay, currentTrack, handleNext, handlePrev 
  } = usePlayer();

  if (!isPlayerVisible) return null;

  return (
    <div className="fixed bottom-6 z-50 w-full flex justify-center pointer-events-none">
      <AnimatePresence mode="wait">
        
        {/* 1. The Rotating Icon (Bottom Right) */}
        {!isPlayerExpanded && (
          <motion.div
            key="icon"
            initial={{ scale: 0, x: 100 }}
            animate={{ scale: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="pointer-events-auto fixed bottom-8 right-8 cursor-pointer"
            onClick={() => setIsPlayerExpanded(true)}
          >
            <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear", playState: isPlaying ? "running" : "paused" }}
              >
                <FaMusic className="text-white text-xl" />
              </motion.div>
              {/* Ripple Effect */}
              {isPlaying && (
                <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
              )}
            </div>
          </motion.div>
        )}

        {/* 2. The Expanded Control Bar (Bottom Center) */}
        {isPlayerExpanded && (
          <motion.div
            key="controls"
            initial={{ width: 60, height: 60, x: "40vw", opacity: 0 }} // Start from the icon's position roughly
            animate={{ width: "auto", height: "auto", x: 0, opacity: 1 }}
            exit={{ width: 60, height: 60, x: "40vw", opacity: 0, transition: { duration: 0.3 } }}
            className="pointer-events-auto mb-2"
          >
            <div className="bg-black/80 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl min-w-[320px]">
              
              {/* Rotating Icon Small */}
              <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ repeat: Infinity, duration: 3, ease: "linear", playState: isPlaying ? "running" : "paused" }}
                 className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"
              >
                <FaMusic className="text-blue-400 text-sm" />
              </motion.div>

              {/* Info & Controls */}
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-white text-xs font-bold truncate max-w-[200px] mb-1">
                  {currentTrack?.title || "Unknown Track"}
                </p>
                <div className="flex items-center gap-4">
                   <button onClick={handlePrev} className="text-white/60 hover:text-white transition"><FaStepBackward /></button>
                   <button onClick={togglePlay} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition">
                      {isPlaying ? <FaPause size={12} /> : <FaPlay size={12} className="ml-0.5" />}
                   </button>
                   <button onClick={handleNext} className="text-white/60 hover:text-white transition"><FaStepForward /></button>
                </div>
              </div>

              {/* Collapse Button */}
              <button 
                onClick={() => setIsPlayerExpanded(false)}
                className="text-white/40 hover:text-white transition ml-2"
              >
                <FaCompressArrowsAlt className="text-lg rotate-45" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
