"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import {
  FaPodcast, FaSpotify, FaAmazon, FaDeezer, FaFacebook, FaTwitter, FaInstagram, FaTelegram, FaTumblr, FaPinterest
} from "react-icons/fa";
import { SiSpreaker, SiIheartradio, SiCastbox, SiPodcastaddict, SiBluesky, SiThreads } from "react-icons/si";

const socials = [
  { name: "Apple Podcast", icon: FaPodcast, type: "listen", url: "https://apple.co/45rEGes", id: 1 },
  { name: "Spreaker.com", icon: SiSpreaker, type: "listen", url: "https://www.spreaker.com/podcast/bhoot-com--6810037", id: 2 },
  { name: "Spotify", icon: FaSpotify, type: "listen", url: "https://open.spotify.com/show/3ytEXrEnMdkr8oHoYEiNSc", id: 3 },
  { name: "iHeartRadio", icon: SiIheartradio, type: "listen", url: "https://iheart.com/podcast/318115110", id: 4 },
  { name: "Amazon Music", icon: FaAmazon, type: "listen", url: "https://music.amazon.com/podcasts/3784ef50-4999-466a-9e4b-87be425937a5", id: 5 },
  { name: "Castbox", icon: SiCastbox, type: "listen", url: "https://castbox.fm/channel/id6959582", id: 6 },
  { name: "Deezer", icon: FaDeezer, type: "listen", url: "https://www.deezer.com/show/1002499192", id: 7 },
  { name: "Podcast Addict", icon: SiPodcastaddict, type: "listen", url: "https://podcastaddict.com/podcast/bhootcom/6605907", id: 8 },
  
  { name: "Facebook", icon: FaFacebook, type: "follow", url: "https://www.facebook.com/BhootDotComOfficial/", id: 9 },
  { name: "x.com", icon: FaTwitter, type: "follow", url: "https://www.x.com/BhootDotComOfficial/", id: 10 },
  { name: "Bluesky", icon: SiBluesky, type: "follow", url: "https://bsky.app/profile/bhootdotcom.bsky.social", id: 11 },
  { name: "Instagram", icon: FaInstagram, type: "follow", url: "https://www.instagram.com/BhootDotComOfficial/", id: 12 },
  { name: "Threads", icon: SiThreads, type: "follow", url: "https://www.threads.com/BhootDotComOfficial/", id: 13 },
  { name: "Telegram", icon: FaTelegram, type: "follow", url: "https://t.me/BhootDotComOfficial/", id: 14 },
  { name: "Tumblr", icon: FaTumblr, type: "follow", url: "#", id: 15 },
  { name: "Pinterest", icon: FaPinterest, type: "follow", url: "#", id: 16 },
];

export default function SocialGrid() {
  const [selectedSocial, setSelectedSocial] = useState(null);

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
      <div className="w-full max-w-6xl mx-auto px-4 mt-8 pb-32"> {/* Increased padding-bottom for player */}
        <div className="p-8 rounded-3xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl transition-colors duration-500">
          
          {/* UPDATED GAP HERE: Reduced from gap-6 sm:gap-8 to gap-3 sm:gap-4 */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 justify-items-center">
            {socials.map((item) => (
              <motion.div
                key={item.id}
                className="relative cursor-pointer"
                onClick={() => setSelectedSocial(item)}
                initial="rest"
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/50 dark:border-white/20 shadow-lg text-gray-800 dark:text-white/90">
                  <item.icon className="text-2xl sm:text-3xl" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay with Synchronized Blur Animation */}
      <AnimatePresence>
        {selectedSocial && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            
            {/* 1. The Backdrop (Handles the Blur animation) */}
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-black/40 dark:bg-black/60"
              onClick={() => setSelectedSocial(null)}
            />

            {/* 2. The Modal Card */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.3, delay: 0.1 }} // Small delay so bg blurs first
              className="relative w-full max-w-sm bg-white/80 dark:bg-black/40 backdrop-blur-2xl border border-white/40 dark:border-white/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSocial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-800 dark:text-white transition-colors"
              >
                <IoClose size={24} />
              </button>

              {/* Logo with ONE-TIME Shine Animation */}
              <div className="relative w-24 h-24 mb-6 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/10 dark:to-white/5 border border-white/50 dark:border-white/20 flex items-center justify-center overflow-hidden group shadow-inner">
                <selectedSocial.icon className="text-5xl text-gray-800 dark:text-white relative z-10" />
                
                {/* Shine Element - Runs once due to tailwind config */}
                <div className="absolute inset-0 w-full h-full -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/60 dark:via-white/20 to-transparent z-20" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedSocial.name}</h3>
              
              {/* Clickable Blue Underlined Link */}
              <a 
                href={selectedSocial.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium tracking-wide text-blue-600 dark:text-blue-400 underline underline-offset-4 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                {getModalText(selectedSocial)}
              </a>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
