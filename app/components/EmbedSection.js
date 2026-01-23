"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EmbedSection() {
  const [activeTab, setActiveTab] = useState("apple");

  useEffect(() => {
    if (activeTab === "spreaker") {
      const script = document.createElement("script");
      script.src = "https://widget.spreaker.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
        // Cleanup prevents duplicate scripts if user toggles quickly
        try { document.body.removeChild(script); } catch (e) {}
      };
    }
  }, [activeTab]);

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center">
      <div className="flex p-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8 relative">
        {["apple", "spreaker"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? "text-white font-bold" : "text-white/60"
            } relative px-8 py-3 rounded-full text-sm sm:text-base z-10 transition-colors duration-300 capitalize`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab === "apple" ? "Apple Podcast" : "Spreaker.com"}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center min-h-[450px]">
        <AnimatePresence mode="wait">
          {activeTab === "apple" ? (
            <motion.div
              key="apple"
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring" }}
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
                style={{ border: "0px", borderRadius: "12px", width: "100%", height: "450px", maxWidth: "660px" }}
              ></iframe>
            </motion.div>
          ) : (
            <motion.div
              key="spreaker"
              initial={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-full max-w-[660px] bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
