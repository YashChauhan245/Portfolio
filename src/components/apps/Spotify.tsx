/* Spotify — Exact Soundboard Music Player from helper */
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSpotify,
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaVolumeUp,
  FaVolumeMute,
  FaExternalLinkAlt,
} from "react-icons/fa";

interface SpotifyProps {
  isDark?: boolean;
}

interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSec: number;
  color: string;
  cover: string;
  spotifyUrl: string;
}

const TRACKS: Track[] = [
  {
    id: 1,
    title: "7.7 Magnitude",
    artist: "Karan Aujla",
    album: "Four You",
    duration: "3:18",
    durationSec: 198,
    color: "#1DB954",
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop",
    spotifyUrl: "https://open.spotify.com/search/7.7%20Magnitude%20Karan%20Aujla",
  },
  {
    id: 2,
    title: "Softly",
    artist: "Karan Aujla",
    album: "Making Memories",
    duration: "2:34",
    durationSec: 154,
    color: "#ff8c00",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
    spotifyUrl: "https://open.spotify.com/search/Softly%20Karan%20Aujla",
  },
  {
    id: 3,
    title: "Bachke Bachke",
    artist: "Karan Aujla",
    album: "Making Memories",
    duration: "3:28",
    durationSec: 208,
    color: "#af52de",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
    spotifyUrl: "https://open.spotify.com/search/Bachke%20Bachke%20Karan%20Aujla",
  },
  {
    id: 4,
    title: "Winning Speech",
    artist: "Karan Aujla",
    album: "Single",
    duration: "3:45",
    durationSec: 225,
    color: "#007aff",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop",
    spotifyUrl: "https://open.spotify.com/search/Winning%20Speech%20Karan%20Aujla",
  },
];

export default function Spotify({ isDark: _isDark }: SpotifyProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);

  const currentTrack = TRACKS[currentTrackIndex];

  // Auto-progress simulated timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.durationSec) {
            handleNext();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrackIndex]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
  };

  const handlePrev = () => {
    setCurrentTime(0);
    setCurrentTrackIndex((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1));
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const progressPercent = (currentTime / currentTrack.durationSec) * 100;

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-b from-[#121212] via-[#1c1c1e] to-[#0a0a0a] text-white custom-scrollbar select-none">
      <div className="max-w-4xl mx-auto p-6 md:p-10 flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2">
            <FaSpotify className="text-[#1DB954] text-2xl animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#1DB954]">
              Developer Soundboard
            </span>
          </div>
          <a
            href={currentTrack.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition no-underline border border-white/10"
          >
            <FaExternalLinkAlt size={10} />
            <span>Open in Spotify</span>
          </a>
        </div>

        {/* Music Player Frame */}
        <div className="grid md:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute -top-32 -left-32 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none transition-colors duration-500"
            style={{ backgroundColor: currentTrack.color }}
          />

          {/* Left: Spinning Vinyl */}
          <div className="md:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full shadow-2xl flex items-center justify-center bg-[#090909]">
              {/* Outer grooves */}
              <div className="absolute inset-2 rounded-full border border-white/5" />
              <div className="absolute inset-6 rounded-full border border-white/5" />
              <div className="absolute inset-10 rounded-full border border-white/5" />

              {/* Vinyl Plate Spinner */}
              <motion.div
                className="w-full h-full rounded-full flex items-center justify-center p-8 overflow-hidden cursor-pointer"
                animate={isPlaying ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                onClick={handlePlayPause}
              >
                <img
                  src={currentTrack.cover}
                  alt={currentTrack.title}
                  className="w-full h-full object-cover rounded-full pointer-events-none select-none border-4 border-[#121212]"
                />
              </motion.div>

              {/* Center hole spindle */}
              <div className="absolute w-4 h-4 rounded-full bg-gradient-to-b from-gray-700 to-black border-2 border-[#121212] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>
            </div>

            {/* Simulated wave equalizers */}
            <div className="flex gap-1.5 items-end justify-center h-8 mt-6 w-full">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-t-full bg-gradient-to-t from-[#1DB954] to-emerald-400"
                  animate={
                    isPlaying
                      ? { height: [4, Math.random() * 24 + 4, 4] }
                      : { height: 4 }
                  }
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Controller Section */}
          <div className="md:col-span-7 flex flex-col justify-center">
            {/* Meta */}
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1DB954] bg-[#1DB954]/10 px-2 py-0.5 rounded">
                Now Playing
              </span>
              <h2 className="text-2xl font-bold mt-2 tracking-tight text-white">
                {currentTrack.title}
              </h2>
              <p className="text-sm text-white/50 font-medium mt-1">
                {currentTrack.artist} — <span className="italic">{currentTrack.album}</span>
              </p>
            </div>

            {/* Scrubber slider */}
            <div className="space-y-1 mb-6">
              <input
                type="range"
                min="0"
                max={currentTrack.durationSec}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1DB954]"
                style={{
                  background: `linear-gradient(to right, #1DB954 ${progressPercent}%, rgba(255,255,255,0.1) ${progressPercent}%)`,
                }}
              />
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Audio Buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-5">
                <button
                  onClick={handlePrev}
                  className="p-3 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition border-none bg-transparent cursor-pointer"
                >
                  <FaBackward size={18} />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="w-14 h-14 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center transition shadow-lg shadow-[#1DB954]/20 border-none cursor-pointer active:scale-95"
                >
                  {isPlaying ? <FaPause size={18} /> : <FaPlay size={18} className="ml-1" />}
                </button>
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition border-none bg-transparent cursor-pointer"
                >
                  <FaForward size={18} />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition border-none bg-transparent cursor-pointer"
                >
                  {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-20 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, #ffffff ${isMuted ? 0 : volume}%, rgba(255,255,255,0.1) ${isMuted ? 0 : volume}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Queue */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">
            Up Next
          </h3>
          <div className="grid gap-2">
            {TRACKS.map((track, index) => {
              const isActive = index === currentTrackIndex;
              return (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-left bg-transparent cursor-pointer ${
                    isActive
                      ? "bg-[#1DB954]/10 border-[#1DB954]/30 text-white font-bold"
                      : "bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={track.cover}
                      alt={track.title}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div>
                      <p className={`text-sm ${isActive ? "text-[#1DB954]" : "text-white"}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-white/40 font-medium mt-0.5">
                        {track.artist}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isActive && isPlaying && (
                      <span className="text-[10px] text-[#1DB954] uppercase tracking-widest font-bold">
                        Playing
                      </span>
                    )}
                    <span className="text-xs font-mono text-white/40">{track.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
