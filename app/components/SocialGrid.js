"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaPodcast, FaSpotify, FaAmazon, FaDeezer, FaFacebook, FaTwitter, FaInstagram, FaTelegram, FaTumblr, FaPinterest
} from "react-icons/fa";
import { SiSpreaker, SiIheartradio, SiCastbox, SiPodcastaddict, SiBluesky, SiThreads } from "react-icons/si";

const socials = [
  { name: "Apple Podcast", icon: FaPodcast, type: "listen", url: "https://podcasts.apple.com/us/podcast/bhoot-com/id1866602030", id: 1 },
  { name: "Spreaker.com", icon: SiSpreaker, type: "listen", url: "https://www.spreaker.com/podcast/bhoot-com--6810037", id: 2 },
  { name: "Spotify", icon: FaSpotify, type: "listen", url: "#", id: 3 },
  { name: "iHeartRadio", icon: SiIheartradio, type: "listen", url: "#", id: 4 },
  { name: "Amazon Music", icon: FaAmazon, type: "listen", url: "#", id: 5 },
  { name: "Castbox", icon: SiCastbox, type: "listen", url: "#", id: 6 },
  { name: "Deezer", icon: FaDeezer, type: "listen", url: "#", id: 7 },
  { name: "Podcast Addict", icon: SiPodcastaddict, type: "listen", url: "#", id: 8 },
  { name: "Facebook", icon: FaFacebook, type: "follow", url: "#", id: 9 },
  { name: "x.com", icon: FaTwitter, type: "follow", url: "#", id: 10 },
  { name: "Bluesky", icon: SiBluesky, type: "follow", url: "#", id: 11 },
  { name: "Instagram", icon: FaInstagram, type: "follow", url: "#", id: 12 },
  { name: "Threads", icon: SiThreads, type: "follow", url: "#", id: 13 },
  { name: "Telegram", icon: FaTelegram, type: "follow", url: "#", id: 14 },
  { name: "Tumblr", icon: FaTumblr, type: "follow", url: "#", id: 15 },
  { name: "Pinterest", icon: FaPinterest, type: "follow", url: "#", id: 16 },
];

export default function SocialGrid() {
  const [selectedSocial, setSelectedSocial] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setSelectedSocial(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const getModalText = (item) => {
    if (item.type === "listen") return `Click to Listen Latest Episodes on ${item.name}.`;
    return `Click to Follow Bhoot.com on ${item.name}.`;
  };

  return (
    <>
      <div className="w-full max-w-6xl mx-auto px-4 mt-8 pb-20">
        <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-2xl transition-colors duration-500">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
            {socials.map((item) => (
              <motion.div
                key={item.id}
                className="relative cursor-pointer"
                onClick={() => setSelectedSocial(item)}
                initial="rest"
                whileHover={{ y: -10 }} // 1. Just move up slightly on hover
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/40 dark:bg-white/10 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-lg text-gray-800 dark:text-white/90">
                  <item.icon className="text-2xl sm:text-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 2 & 3. Modal Overlay */}
      <AnimatePresence>
        {selectedSocial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          >
            {/* Dark Blurred Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedSocial(null)}
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-sm bg-white/10 dark:bg-black/40 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSocial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <IoClose size={24} />
              </button>

              {/* Logo with Shine Animation */}
              <div className="relative w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center overflow-hidden group">
                <selectedSocial.icon className="text-5xl text-white relative z-10" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 w-full h-full -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-white mb-4">{selectedSocial.name}</h3>
              
              <a 
                href={selectedSocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light tracking-wide text-blue-200 hover:text-white transition-colors border-b border-blue-200/50 hover:border-white pb-0.5"
              >
                {getModalText(selectedSocial)}
              </a>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
