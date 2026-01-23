"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

export default function EmbedSection() {
  const [activeTab, setActiveTab] = useState("playlist"); // Default to playlist
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { playTrack, currentTrack, isPlaying, togglePlay, stopCustomAudio } = usePlayer();

  // Fetch Spreaker RSS Feed and parse it to JSON
  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      try {
        // Using a public RSS to JSON bridge to bypass CORS and parse XML
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://www.spreaker.com/show/6810037/episodes/feed");
        const data = await res.json();
        
        if (data.items) {
          // Sort Old to New
          const sorted = data.items.reverse().map(item => ({
             title: item.title,
             guid: item.guid,
             audioUrl: item.enclosure.link,
             duration: item.enclosure.duration || 0, // Note: rss2json might not always get duration correctly
             pubDate: item.pubDate
          }));
          setEpisodes(sorted);
        }
      } catch (error) {
        console.error("Failed to fetch playlist", error);
      }
      setLoading(false);
    }
    fetchEpisodes();
  }, []);

  // Handle Tab Switching Logic
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "playlist") {
      // We entered custom playlist, maybe do nothing?
    } else {
      // User switched to Iframe (Apple/Spreaker), stop our custom player
      stopCustomAudio();
    }
  };

  // Format Time Helper
  const formatTime = (seconds) => {
    if(!seconds) return "--:--";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center px-4">
      {/* 3-Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-full mb-8 relative transition-colors duration-500 shadow-sm">
        {["playlist", "apple", "spreaker"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${
              activeTab === tab 
                ? "text-gray-900 dark:text-white font-bold" 
                : "text-gray-600 dark:text-white/60"
            } relative px-6 py-2 sm:px-8 sm:py-3 rounded-full text-xs sm:text-sm z-10 transition-colors duration-300 capitalize`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/80 dark:bg-white/20 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab === "playlist" ? "Latest Episodes" : tab === "apple" ? "Apple Podcast" : "Spreaker.com"}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[660px] p-2 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-xl min-h-[450px]">
          <AnimatePresence mode="wait">
            
            {/* 1. Custom Playlist */}
            {activeTab === "playlist" && (
               <motion.div
                 key="playlist"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 20 }}
                 className="w-full h-[450px] overflow-y-auto pr-2 custom-scrollbar"
               >
                 {loading ? (
                   <div className="flex h-full items-center justify-center text-gray-500">Loading Episodes...</div>
                 ) : (
                   <div className="flex flex-col gap-2">
                     {episodes.map((ep, index) => {
                       const isCurrent = currentTrack?.guid === ep.guid;
                       // Calculate remaining time if playing
                       const displayTime = isCurrent && isPlaying && usePlayer 
                         ? "Playing..." // Simplified for this demo
                         : "Listen"; // We don't have exact duration from simple RSS feed easily without metadata parsing

                       return (
                         <div 
                           key={index}
                           onClick={() => playTrack(ep, episodes)}
                           className={`group flex items-center p-3 rounded-xl border transition-all cursor-pointer ${
                             isCurrent 
                               ? "bg-blue-500/10 border-blue-500/30" 
                               : "bg-white/40 dark:bg-white/5 border-transparent hover:bg-white/60 dark:hover:bg-white/10"
                           }`}
                         >
                            {/* Play Button */}
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${
                              isCurrent ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white"
                            }`}>
                              {isCurrent && isPlaying ? <FaPause size={12}/> : <FaPlay size={12} className="ml-1"/>}
                            </div>
                            
                            {/* Title */}
                            <div className="flex-1 min-w-0">
                               <h4 className={`text-sm font-medium truncate ${isCurrent ? "text-blue-600 dark:text-blue-400" : "text-gray-800 dark:text-gray-200"}`}>
                                 {ep.title}
                               </h4>
                            </div>

                            {/* Status */}
                            <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                               {isCurrent && isPlaying ? (
                                 <span className="flex items-center gap-1">
                                   <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"/> 
                                   Playing
                                 </span>
                               ) : (
                                 <span className="opacity-0 group-hover:opacity-100 transition-opacity">Play</span>
                               )}
                            </div>
                         </div>
                       )
                     })}
                   </div>
                 )}
               </motion.div>
            )}

            {/* 2. Apple Embed */}
            {activeTab === "apple" && (
              <motion.div
                key="apple"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <iframe
                  height="450"
                  width="100%"
                  title="Media player"
                  src="https://embed.podcasts.apple.com/us/podcast/bhoot-com/id1866602030?itscg=30200&itsct=podcast_box_player&ls=1&mttnsubad=1866602030&theme=auto"
                  id="embedPlayer"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  allow="autoplay *; encrypted-media *; clipboard-write"
                  style={{ border: "0px", borderRadius: "10px", width: "100%", height: "450px" }}
                ></iframe>
              </motion.div>
            )}

            {/* 3. Spreaker Embed */}
            {activeTab === "spreaker" && (
              <motion.div
                key="spreaker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
              >
                <iframe 
                  src="https://widget.spreaker.com/player?show_id=6810037&theme=light&playlist=show&playlist-continuous=true&chapters-image=true&episode_image_position=left&hide-logo=false&hide-likes=false&hide-comments=false&hide-sharing=false&hide-download=true&cover_image_url=https%3A%2F%2Fd3wo5wojvuv7l.cloudfront.net%2Fimages.spreaker.com%2Foriginal%2F3e593675285fc7f65f043fd7dde3d69d.jpg" 
                  width="100%" 
                  height="450px" 
                  title="Bhoot.com" 
                  frameBorder="0"
                  style={{ borderRadius: "10px" }}
                ></iframe>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
