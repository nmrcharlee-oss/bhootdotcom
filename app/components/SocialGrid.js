"use client";
import { motion } from "framer-motion";
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
  const getHoverText = (item) => {
    if (item.type === "listen") return `click to listen latest episodes on ${item.name}.`;
    return `click to follow bhoot.com on ${item.name}.`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8 pb-20">
      
      {/* 3. Glass Background Container for Social Section */}
      <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
        
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-6 sm:gap-8 justify-items-center">
          {socials.map((item) => (
            <motion.div
              key={item.id}
              className="relative flex justify-center items-center"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Main Icon (Just visual, not a link) */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg cursor-pointer overflow-hidden"
                variants={{
                  rest: { scale: 1, filter: "blur(0px)" },
                  hover: { scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)", filter: "blur(2px)" }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <item.icon className="text-2xl sm:text-3xl text-white/90" />
              </motion.div>

              {/* Hover Card (Contains the actual Link) */}
              <motion.div
                className="absolute flex flex-col items-center justify-center text-center p-4 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl w-[180px]"
                // Very high Z-index to ensure it sits on top of everything
                style={{ zIndex: 100, top: "50%", left: "50%", x: "-50%", y: "-50%" }}
                variants={{
                  rest: { opacity: 0, scale: 0.5, display: "none" },
                  hover: { opacity: 1, scale: 1.1, display: "flex", y: -100 } // Moves up on hover
                }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className="text-2xl mb-2 text-white" />
                <span className="font-bold text-white mb-2 text-sm">{item.name}</span>
                
                {/* The Link is here now */}
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-blue-300 leading-tight tracking-wide uppercase hover:text-white transition-colors underline decoration-blue-300/50 underline-offset-4 cursor-pointer"
                >
                   {getHoverText(item)}
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
