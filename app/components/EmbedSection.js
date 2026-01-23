"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../context/PlayerContext";
import { FaPlay, FaPause } from "react-icons/fa";

export default function EmbedSection() {
  const [activeTab, setActiveTab] = useState("playlist");
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const { playTrack, currentTrack, isPlaying, stopCustomAudio } = usePlayer();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab !== "playlist") {
      stopCustomAudio(); 
    }
  };

  useEffect(() => {
    async function fetchEpisodes() {
      setLoading(true);
      try {
        // FIX: Removed 'cache: no-store' and added timestamp query param to bypass cache
        const timestamp = new Date().getTime();
        const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.spreaker.com/show/6810037/episodes/feed&t=${timestamp}`);
        const data = await res.json();
        
        if (data.items) {
          const sorted = data.items.map(item => ({
             title: item.title,
             guid: item.guid,
             audioUrl: item.enclosure.link,
             duration: item.enclosure.duration || 0, 
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

  const formatTime = (seconds) => {
    if(!seconds || seconds === 0) return "Audio";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 flex flex-col items-center px-4">
      <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl sm:rounded-full mb-8 relative transition-colors duration-500 shadow-sm">
        {["playlist", "apple", "spreaker"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`${
              activeTab === tab 
                ? "text-gray-900 dark:text-white font-bold" 
                : "text-gray-600 dark:text-white/60"
            } relative px-4 py-2 sm:px-8 sm:py-3 rounded-xl sm:rounded-full text-xs sm:text-sm z-10 transition-colors duration-300 capitalize flex-1 sm:flex-none text-center min-w-[100px]`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 bg-white/80 dark:bg-white/20 shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] rounded-xl sm:rounded-full -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab === "playlist" ? "Latest Episode" : tab === "apple" ? "Apple Podcast" : "Spreaker"}
          </button>
        ))}
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full max-w-[660px] p-2 rounded-2xl bg-white/40 dark:bg-white/5 backdrop-blur-lg border border-white/30 dark:border-white/10 shadow-xl min-h-[450px]">
          <AnimatePresence mode="wait">
            {activeTab === "playlist" && (
               <motion.div
                 key="playlist"
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: 10 }}
                 className="w-full h-[450px] overflow-y-auto pr-0 sm:pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]"
               >
                 {loading ? (
                   <div className="flex h-full items-center justify-center text-gray-500">Loading Episodes...</div>
                 ) : (
                   <div className="flex flex-col gap-2">
                     {episodes.map((ep, index) => {
                       const isCurrent = currentTrack?.guid === ep.guid;
                       return (
                         <div 
                           key={index}
                           onClick={() => playTrack(ep, episodes)}
                           className={`group flex items-center p-3 rounded-xl border transition-all cursor-pointer ${
                             isCurrent 
                               ? "bg-red-500/10 border-red-500/30" 
                               : "bg-white/40 dark:bg-white/5 border-transparent hover:bg-white/60 dark:hover:bg-white/10"
                           }`}
                         >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors shrink-0 ${
                              isCurrent ? "bg-red-600 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-white"
                            }`}>
                              {isCurrent && isPlaying ? <FaPause size={12}/> : <FaPlay size={12} className="ml-1"/>}
                            </div>
                            <div className="flex-1 min-w-0 mr-2">
                               <h4 className={`text-sm font-medium truncate ${isCurrent ? "text-red-600 dark:text-red-400" : "text-gray-800 dark:text-gray-200"}`}>
                                 {ep.title}
                               </h4>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                               {isCurrent && isPlaying ? "Playing" : formatTime(ep.duration)}
                            </div>
                         </div>
                       )
                     })}
                   </div>
                 )}
               </motion.div>
            )}

            {activeTab === "apple" && (
              <motion.div key="apple" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <iframe
                  src="https://embed.podcasts.apple.com/us/podcast/bhoot-com/id1866602030?itscg=30200&itsct=podcast_box_player&ls=1&mttnsubad=1866602030&theme=auto"
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
                  allow="autoplay *; encrypted-media *; clipboard-write"
                  style={{ border: "0px", borderRadius: "10px", width: "100%", height: "450px" }}
                ></iframe>
              </motion.div>
            )}

            {activeTab === "spreaker" && (
              <motion.div key="spreaker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                <iframe 
                  src="https://widget.spreaker.com/player?show_id=6810037&theme=light&playlist=show&playlist-continuous=true&chapters-image=true&episode_image_position=left&hide-logo=false&hide-likes=false&hide-comments=false&hide-sharing=false&hide-download=true&cover_image_url=https%3A%2F%2Fd3wo5wojvuv7l.cloudfront.net%2Fimages.spreaker.com%2Foriginal%2F3e593675285fc7f65f043fd7dde3d69d.jpg" 
                  width="100%" height="450px" frameBorder="0" style={{ borderRadius: "10px" }}
                ></iframe>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
