/* Youtube — Embedded Video Player & Showcase */
import { useState } from "react";
import { ExternalLink, Play, Tv, Search } from "lucide-react";

interface YoutubeProps {
  isDark?: boolean;
}

interface Video {
  id: string;
  embedId: string;
  title: string;
  channel: string;
  views: string;
  category: string;
  thumbnail: string;
}

const FEATURED_VIDEOS: Video[] = [
  {
    id: "1",
    embedId: "L_LUpnjgPso",
    title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
    channel: "Lofi Girl",
    views: "1.2M views",
    category: "Music",
    thumbnail: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    embedId: "e_E9W2vsRbA",
    title: "VALORANT - Official Launch Gameplay Trailer & Highlights",
    channel: "VALORANT",
    views: "3.8M views",
    category: "Gaming",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
  },
  {
    id: "3",
    embedId: "wm5gMKCORL4",
    title: "Next.js 15 Full Course 2026 - Modern Web Development",
    channel: "Code With Antonio",
    views: "450K views",
    category: "Tutorials",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
  },
  {
    id: "4",
    embedId: "M576WGiDBdQ",
    title: "Coding & Study Music Mix - Deep Focus Ambient",
    channel: "Chillhop Music",
    views: "320K views",
    category: "Coding",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop",
  },
];

export default function Youtube({ isDark }: YoutubeProps) {
  const [activeVideo, setActiveVideo] = useState<Video>(FEATURED_VIDEOS[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = FEATURED_VIDEOS.filter((v) =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.channel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`w-full h-full flex flex-col ${
        isDark ? "bg-[#0f0f0f] text-white" : "bg-[#f9f9f9] text-gray-900"
      } select-none overflow-hidden`}
    >
      {/* Header Bar */}
      <div
        className={`h-14 flex items-center justify-between px-4 sm:px-6 border-b ${
          isDark ? "bg-[#181818] border-white/10" : "bg-white border-black/10"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-5.5 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-md shadow-red-600/30">
            <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">YouTube</span>
        </div>

        {/* Quick Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 w-72 focus-within:border-red-500/50 transition-all">
          <Search className="w-3.5 h-3.5 opacity-60" />
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs outline-none w-full placeholder:text-white/40 text-white"
          />
        </div>

        {/* Attractive Watch on YouTube Button */}
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#FF0000] hover:bg-[#cc0000] text-white transition-all shadow-md shadow-red-600/30 hover:scale-105 active:scale-95 border border-red-500"
        >
          <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Watch on YouTube</span>
        </a>
      </div>

      {/* Main Container */}
      <div className="flex-1 grid md:grid-cols-12 overflow-hidden">
        {/* Left: Main Video Player */}
        <div className="md:col-span-8 flex flex-col h-full bg-black">
          <div className="relative w-full aspect-video bg-black shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${activeVideo.embedId}?autoplay=1&rel=0`}
              title={activeVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="p-5 flex-1 overflow-y-auto bg-[#0f0f0f] border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-[#FF0000] px-2.5 py-0.5 rounded-full">
                {activeVideo.category}
              </span>
              <span className="text-xs text-white/50">{activeVideo.views}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-3 leading-snug">
              {activeVideo.title}
            </h2>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10 text-xs text-white/70">
              <div className="w-8 h-8 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center font-bold text-red-500">
                {activeVideo.channel.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-white">{activeVideo.channel}</p>
                <p className="text-[10px] text-white/40">Verified Channel</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Video Queue Sidebar */}
        <div className={`md:col-span-4 p-4 border-l overflow-y-auto flex flex-col gap-3 ${
          isDark ? "bg-[#181818] border-white/10" : "bg-white border-black/10"
        }`}>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold uppercase tracking-wider opacity-70 flex items-center gap-2">
              <Tv className="w-4 h-4 text-[#FF0000]" />
              Recommended Videos
            </h3>
          </div>

          <div className="space-y-2.5">
            {filteredVideos.map((video) => {
              const isActive = video.id === activeVideo.id;
              return (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`w-full flex gap-3 p-2.5 rounded-xl transition-all text-left border ${
                    isActive
                      ? "bg-[#FF0000]/15 border-[#FF0000]/40 text-white shadow-lg"
                      : isDark
                      ? "bg-white/5 border-transparent hover:bg-white/10 text-white/80"
                      : "bg-gray-100 border-transparent hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-gray-900 border border-white/10">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback image if network fails
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&h=200&fit=crop`;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white opacity-90" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold line-clamp-2 leading-tight text-white">
                      {video.title}
                    </h4>
                    <p className="text-[11px] text-white/60 mt-1">{video.channel}</p>
                    <span className="text-[10px] text-white/40">{video.views}</span>
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
