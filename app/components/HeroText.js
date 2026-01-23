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
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 mb-8 z-10">
      <h2 className="text-lg text-gray-500 dark:text-gray-400 font-light tracking-widest uppercase mb-2">
        Welcome to
      </h2>
      <div className="h-24 relative flex justify-center items-center min-w-[300px]">
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[textState]}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 2, ease: "easeInOut" }} // Slow dissolve
            
            // CSS for GIF Background Text
            className="absolute text-5xl sm:text-6xl font-extrabold pb-2 bg-center bg-cover"
            style={{
              backgroundImage: "url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHR4ZDJ2ZGZlNTY4ZHJ2YTNqcTdvOHlvM2J2dGFkb3lnZjF1eHN5YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKOCCkDRo0VbPLq/giphy.gif')",
              color: "transparent",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              backgroundSize: "cover",
            }}
          >
            {texts[textState]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
