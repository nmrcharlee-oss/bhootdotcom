"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmbedSection() {
  const [activeTab, setActiveTab] = useState("apple");

  useEffect(() => {
    if (activeTab === "spreaker") {
      if (window.Spreaker && window.Spreaker.makeWidgets) {
        window.Spreaker.makeWidgets();
      } else {
        const script = document.createElement("script");
        script.src = "https://widget.spreaker.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [activeTab]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center">
      {/* Tab Switcher - Adapted for Light/Dark */}
      <div className="flex p-1 bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full mb-8 relative transition-colors duration-500">
        {["apple", "spreaker"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab 
                ? "text-gray-900 dark:text-white font-bold" 
                : "text-gray-500 dark:text-white/60"
            } relative px-8 py-3 rounded-full text-sm sm:text-base z-10 transition-colors duration-300 capitalize`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white dark:bg-white/20 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab === "apple" ? "Apple Podcast" : "Spreaker.com"}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <AnimatePresence mode="wait">
          {activeTab === "apple" ? (
            <motion.div
              key="apple"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-[660px]"
            >
              <iframe
                height="450"
                width="100%"
                title="Media player"
                src="https://embed.podcasts.apple.com/us/podcast/bhoot-com/id1866602030?itscg=30200&amp;itsct=podcast_box_player&amp;ls=1&amp;mttnsubad=1866602030&amp;theme=auto"
                id="embedPlayer"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                allow="autoplay *; encrypted-media *; clipboard-write"
                style={{ border: "0px", borderRadius: "12px", width: "100%", height: "450px" }}
              ></iframe>
            </motion.div>
          ) : (
            <motion.div
              key="spreaker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="w-full max-w-[660px] bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl overflow-hidden border border-black/5 dark:border-white/10 shadow-xl"
            >
              <div className="w-full">
                <a
                  className="spreaker-player"
                  href="https://www.spreaker.com/podcast/bhoot-com--6810037"
                  data-resource="show_id=6810037"
                  data-width="100%"
                  data-height="350px"
                  data-theme="light"
                  data-playlist="show"
                  data-playlist-continuous="true"
                  data-chapters-image="true"
                  data-episode-image-position="left"
                  data-hide-logo="false"
                  data-hide-likes="false"
                  data-hide-comments="false"
                  data-hide-sharing="false"
                  data-hide-download="true"
                  data-title="Bhoot.com"
                  data-cover="https://d3wo5wojvuv7l.cloudfront.net/images.spreaker.com/original/3e593675285fc7f65f043fd7dde3d69d.jpg"
                >
                  Listen to "Bhoot.com" on Spreaker.
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
