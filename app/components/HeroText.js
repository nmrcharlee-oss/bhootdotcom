"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroText() {
  const [textState, setTextState] = useState(0);
  const texts = ["bhoot.com", "bhootdotcom", "Bhoot.Com"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextState((prev) => (prev + 1) % texts.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 mb-8 z-10">
      <h2 className="text-lg text-gray-500 dark:text-gray-400 font-light tracking-widest uppercase mb-2">
        Welcome to
      </h2>
      <div className="h-16 relative flex justify-center items-center min-w-[280px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[textState]}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            // Gradient: Red & Black (Light Mode) | Red & White (Dark Mode)
            className="absolute text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-black to-red-600 dark:from-red-500 dark:via-white dark:to-red-500 drop-shadow-sm pb-2"
          >
            {texts[textState]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
