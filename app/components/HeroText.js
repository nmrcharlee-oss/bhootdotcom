"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroText() {
  const [textState, setTextState] = useState(0);
  const texts = ["Bhoot.com", "BhootDotCom"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextState((prev) => (prev + 1) % texts.length);
    }, 3000); // Switch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 mb-8 z-10">
      <h2 className="text-lg text-gray-500 dark:text-gray-400 font-light tracking-widest uppercase mb-2">
        Welcome to
      </h2>
      <div className="h-12 relative flex justify-center items-center min-w-[250px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[textState]}
            initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 drop-shadow-sm"
          >
            {texts[textState]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
