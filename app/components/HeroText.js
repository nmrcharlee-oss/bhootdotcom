"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroText() {
  const [textState, setTextState] = useState(0);
  const texts = [
    "Bhoot.com", 
    "BhootDotCom", 
    "bhoot.com", 
    "bhootdotcom", 
    "Bhoot.Com", 
    "Bhootdotcom"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextState((prev) => (prev + 1) % texts.length);
    }, 5000); // Slower switch (every 5 seconds)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 mb-8 z-10">
      <h2 className="text-lg text-gray-500 dark:text-gray-400 font-light tracking-widest uppercase mb-2">
        Welcome to
      </h2>
      <div className="h-20 relative flex justify-center items-center min-w-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={texts[textState]}
            // 1. Spin Top to Bottom (Y-axis transition)
            initial={{ opacity: 0, rotateX: -90, y: -40 }}
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: 90, y: 40 }}
            transition={{ duration: 2, ease: "easeInOut" }} // Very slow transition
            className="absolute"
          >
            <motion.span
              // 2. Spooky Shake & Bulb Fluctuation (Flicker)
              animate={{ 
                x: [0, -1, 1, -1, 0, 1, 0], // Subtle Shake
                opacity: [1, 0.8, 0.5, 0.9, 0.6, 1] // Bulb Flicker
              }}
              transition={{ 
                duration: 4, // Slow flicker loop
                repeat: Infinity,
                ease: "linear"
              }}
              className="block text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-700 via-black to-red-700 dark:from-red-600 dark:via-gray-200 dark:to-red-600 drop-shadow-lg pb-2"
              style={{ textShadow: "0px 0px 10px rgba(220, 38, 38, 0.3)" }}
            >
              {texts[textState]}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
