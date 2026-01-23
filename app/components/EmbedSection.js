"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmbedSection() {
  const [activeTab, setActiveTab] = useState("apple");

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center">
      {/* Tab Switcher */}
      <div className="flex p-1 bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-full mb-8 relative transition-colors duration-500 shadow-sm">
        {["apple", "spreaker"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab 
                ? "text-gray-900 dark:text-white font-bold" 
                : "text-gray-600 dark:text-white/60"
            } relative px-8 py-3 rounded-full text-sm sm:text-base z-10 transition-colors duration-300 capitalize`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/80 dark:bg-white/20 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab === "apple" ? "Apple Podcast" : "Spreaker.com"}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center">
        {/* Transparent Glass Background Container for the Embed */}
        <div className="w-full max-w-[660px] p-2 rounded-2xl bg-white/20 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-xl">
          <AnimatePresence mode="wait">
            {activeTab === "apple" ? (
              <motion.div
                key="apple"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                <iframe
                  height="450"
                  width="100%"
                  title="Media player"
                  src="https://embed.podcasts.apple.com/us/podcast/bhoot-com/id1866602030?itscg=30200&amp;itsct=podcast_box_player&amp;ls=1&amp;mttnsubad=1866602030&amp;theme=auto"
                  id="embedPlayer"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  allow="autoplay *; encrypted-media *; clipboard-write"
                  style={{ border: "0px", borderRadius: "10px", width: "100%", height: "450px" }}
                ></iframe>
              </motion.div>
            ) : (
              <motion.div
                key="spreaker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="w-full"
              >
                {/* Updated Spreaker Iframe */}
                <iframe 
                  src="https://widget.spreaker.com/player?show_id=6810037&theme=light&playlist=show&playlist-continuous=true&chapters-image=true&episode_image_position=left&hide-logo=false&hide-likes=false&hide-comments=false&hide-sharing=false&hide-download=true&cover_image_url=https%3A%2F%2Fd3wo5wojvuv7l.cloudfront.net%2Fimages.spreaker.com%2Foriginal%2F3e593675285fc7f65f043fd7dde3d69d.jpg" 
                  width="100%" 
                  height="450px" 
                  title="Bhoot.com" 
                  frameBorder="0"
                  style={{ borderRadius: "10px" }} // Added explicit border radius
                ></iframe>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
