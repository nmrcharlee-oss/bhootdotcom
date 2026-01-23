"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false); // Controls if icon is seen
  const [isPlayerExpanded, setIsPlayerExpanded] = useState(false); // Controls controls vs icon
  
  const audioRef = useRef(null);

  // Initialize Audio Object
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', handleNext);
    audioRef.current.addEventListener('timeupdate', () => {
      // Force re-render for time update (optional optimization could be done here)
      setCurrentTrack(prev => ({...prev, currentTime: audioRef.current.currentTime}));
    });
    return () => {
      if(audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleNext);
      }
    };
  }, []);

  const playTrack = (track, list) => {
    if (list) setPlaylist(list);
    
    // If clicking the same track, toggle play/pause
    if (currentTrack?.guid === track.guid) {
      togglePlay();
      return;
    }

    // New track
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentTrack(track);
      setIsPlayerVisible(true); // Show the icon
    }
  };

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleNext = () => {
    // Simple next logic
    if(!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.guid === currentTrack.guid);
    if(currentIndex < playlist.length - 1) {
      playTrack(playlist[currentIndex + 1]);
    } else {
      setIsPlaying(false); // End of playlist
    }
  };

  const handlePrev = () => {
    if(!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(t => t.guid === currentTrack.guid);
    if(currentIndex > 0) {
      playTrack(playlist[currentIndex - 1]);
    }
  };

  // Helper to stop custom audio when user switches to iFrame tabs
  const stopCustomAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <PlayerContext.Provider value={{ 
      isPlaying, currentTrack, playTrack, togglePlay, handleNext, handlePrev,
      isPlayerVisible, setIsPlayerExpanded, isPlayerExpanded, stopCustomAudio
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
