/* Gallery — Exact Creative Photo Board from helper */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

interface GalleryProps {
  isDark?: boolean;
}

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  date: string;
  location: string;
  rotation: number;
}

const IMAGES: ImageItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop",
    alt: "Coding Workspace",
    title: "Code Studio",
    date: "Oct 15, 2025",
    location: "Dev Studio",
    rotation: -3,
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Mountain Peak",
    title: "Mountain Air",
    date: "Jul 8, 2025",
    location: "Alps Range",
    rotation: 4,
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&h=800&fit=crop",
    alt: "Ocean Waves",
    title: "Ocean Breeze",
    date: "Aug 19, 2025",
    location: "Pacific Shore",
    rotation: -2,
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=800&fit=crop",
    alt: "Urban Architecture",
    title: "Urban Skyline",
    date: "Sep 3, 2025",
    location: "Metropolis",
    rotation: 3,
  },
  {
    id: 5,
    src: "https://d17thj9kqp1mkn.cloudfront.net/strapi-assets-tech_a34b41e7f9.jpg",
    alt: "Tech Setup",
    title: "Tech Workstation",
    date: "Nov 12, 2025",
    location: "Home Office",
    rotation: -4,
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=800&fit=crop",
    alt: "Forest Path",
    title: "Nature Trail",
    date: "Jun 30, 2025",
    location: "National Park",
    rotation: 2,
  },
];

export function Gallery({ isDark: _isDark }: GalleryProps) {
  const [activeTab, setActiveTab] = useState<"polaroid" | "memories">("polaroid"); // polaroid | memories
  const [favorites, setFavorites] = useState<number[]>([1, 2]); // default favorited photo ids
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // Auto transition for memories slideshow tab
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (activeTab === "memories") {
      interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % IMAGES.length);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeTab]);

  const toggleFavorite = (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null ? 0 : prev === 0 ? IMAGES.length - 1 : prev - 1
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % IMAGES.length
    );
  };

  return (
    <div className="h-full overflow-y-auto bg-[#1c1c1e] text-white custom-scrollbar select-none">
      <div className="max-w-6xl mx-auto p-6 md:p-8 flex flex-col gap-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <FaImages className="text-cyan-400 text-lg" />
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
              Creative Gallery
            </span>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("polaroid")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition ${
                activeTab === "polaroid" ? "bg-cyan-500 text-black font-bold" : "text-white/60 hover:text-white bg-transparent"
              }`}
            >
              Polaroid Wall
            </button>
            <button
              onClick={() => setActiveTab("memories")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-none cursor-pointer transition ${
                activeTab === "memories" ? "bg-cyan-500 text-black font-bold" : "text-white/60 hover:text-white bg-transparent"
              }`}
            >
              Memories Mode
            </button>
          </div>
        </div>

        {/* Polaroid Board */}
        {activeTab === "polaroid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-4 justify-items-center">
            {IMAGES.map((img, idx) => {
              const isFav = favorites.includes(img.id);
              return (
                <motion.div
                  key={img.id}
                  style={{ rotate: `${img.rotation}deg` }}
                  whileHover={{ rotate: 0, scale: 1.05, y: -8, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  onClick={() => setSelectedIndex(idx)}
                  className="w-64 bg-white p-4 pb-6 rounded-sm shadow-[0_12px_24px_rgba(0,0,0,0.4)] cursor-pointer text-gray-900 border border-gray-200 relative group"
                >
                  {/* Mock Tape Sticker on top */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur border border-white/10 rotate-1 flex items-center justify-center opacity-70" />

                  {/* Photo frame */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-sm mb-4">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                    />
                    {/* Favorite Heart Trigger */}
                    <button
                      onClick={(e) => toggleFavorite(img.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white border-none cursor-pointer transition active:scale-90"
                    >
                      <FaHeart className={isFav ? "text-red-500" : "text-white/70"} size={14} />
                    </button>
                  </div>

                  {/* Captions */}
                  <div className="px-1 text-center font-mono">
                    <h4 className="font-bold text-sm tracking-tight truncate text-gray-800">
                      {img.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 mt-1 flex items-center justify-center gap-1">
                      <FaMapMarkerAlt size={10} className="text-cyan-600" />
                      {img.location}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Memories Cinematic Mode */}
        {activeTab === "memories" && (
          <div className="relative w-full aspect-[16/9] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideshowIndex}
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={IMAGES[slideshowIndex].src}
                  alt={IMAGES[slideshowIndex].alt}
                  className="w-full h-full object-cover"
                />
                {/* Visualizer Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/35" />
              </motion.div>
            </AnimatePresence>

            {/* Carousel controllers */}
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between z-10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                  Memories Slide
                </span>
                <h3 className="text-2xl font-bold mt-2 text-white">
                  {IMAGES[slideshowIndex].title}
                </h3>
                <p className="text-xs text-white/60 font-medium flex items-center gap-2 mt-1">
                  <FaMapMarkerAlt size={10} /> {IMAGES[slideshowIndex].location}
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSlideshowIndex(
                      (prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1)
                    )
                  }
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border-none cursor-pointer"
                >
                  <FaChevronLeft size={12} />
                </button>
                <button
                  onClick={() =>
                    setSlideshowIndex((prev) => (prev + 1) % IMAGES.length)
                  }
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border-none cursor-pointer"
                >
                  <FaChevronRight size={12} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full flex flex-col gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedIndex(null)}
                className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white border-none cursor-pointer flex items-center justify-center"
              >
                <FaTimes size={18} />
              </button>

              {/* Photo Frame Container */}
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-2xl">
                <img
                  src={IMAGES[selectedIndex].src}
                  alt={IMAGES[selectedIndex].alt}
                  className="w-full max-h-[70vh] object-contain rounded-xl"
                />

                {/* Left/Right Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border-none cursor-pointer transition active:scale-95"
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-black/50 hover:bg-black/80 text-white border-none cursor-pointer transition active:scale-95"
                >
                  <FaChevronRight size={16} />
                </button>
              </div>

              {/* Picture Metadata Info Bar */}
              <div className="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-xl">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">
                    {IMAGES[selectedIndex].title}
                  </h3>
                  <div className="flex gap-4 text-xs text-white/50">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt size={12} className="text-cyan-400" />
                      {IMAGES[selectedIndex].date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt size={12} className="text-cyan-400" />
                      {IMAGES[selectedIndex].location}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => toggleFavorite(IMAGES[selectedIndex].id, e)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:bg-white/10 text-xs font-semibold cursor-pointer border-none"
                >
                  <FaHeart
                    className={
                      favorites.includes(IMAGES[selectedIndex].id)
                        ? "text-red-500"
                        : "text-white/40"
                    }
                  />
                  <span>
                    {favorites.includes(IMAGES[selectedIndex].id)
                      ? "Liked"
                      : "Like Photo"}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
