"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../context/PlayerContext";
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaAngleDown } from "react-icons/fa";

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
                // Rotate only if playing
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : { duration: 0.5 }}
                className="w-full h-full flex items-center justify-center"
              >
                {/* BRAND COLOR: RED Icon */}
                <FaMusic className="text-red-500 text-xl" />
              </motion.div>
              
              {/* Ripple Effect (Only if Playing) */}
              {isPlaying && (
                <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
              )}
            </div>
          </motion.div>
        )}

        {/* 2. The Expanded Control Bar (Bottom Center) */}
        {isPlayerExpanded && (
          <motion.div
            key="controls"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="pointer-events-auto mb-2"
          >
            {/* Transparent Glass Background */}
            <div className="bg-white/10 dark:bg-black/30 backdrop-blur-xl border border-white/20 rounded-full px-6 py-4 flex items-center gap-6 shadow-2xl min-w-[320px] max-w-[90vw]">
              
              {/* Rotating Icon Small */}
              <motion.div 
                 animate={{ rotate: isPlaying ? 360 : 0 }}
                 transition={isPlaying ? { repeat: Infinity, duration: 3, ease: "linear" } : { duration: 0.5 }}
                 className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0"
              >
                <FaMusic className="text-red-500 text-sm" />
              </motion.div>

              {/* Info & Controls */}
              <div className="flex flex-col flex-1 min-w-0 items-center">
                <p className="text-gray-900 dark:text-white text-xs font-bold truncate max-w-[200px] mb-2">
                  {currentTrack?.title || "Unknown Track"}
                </p>
                <div className="flex items-center gap-6">
                   <button onClick={handlePrev} className="text-gray-600 dark:text-white/60 hover:text-red-500 transition"><FaStepBackward /></button>
                   
                   <button onClick={togglePlay} className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-110 transition shadow-lg">
                      {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-0.5" />}
                   </button>
                   
                   <button onClick={handleNext} className="text-gray-600 dark:text-white/60 hover:text-red-500 transition"><FaStepForward /></button>
                </div>
              </div>

              {/* Collapse Button (Angle Down) */}
              <button 
                onClick={() => setIsPlayerExpanded(false)}
                className="text-gray-500 dark:text-white/40 hover:text-red-500 transition ml-2 p-2"
              >
                <FaAngleDown className="text-xl" />
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
