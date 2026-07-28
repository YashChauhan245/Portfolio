/* Camera — Exact Native Webcam & Capture from helper */
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  X,
  Download,
  Trash2,
  Camera as CameraIcon,
} from "lucide-react";

interface CameraProps {
  isDark?: boolean;
}

interface Photo {
  id: string;
  dataUrl: string;
  timestamp: number;
}

export default function CameraApp({ isDark }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState("Requesting camera access...");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [flash, setFlash] = useState(false);

  // Start Camera Stream
  useEffect(() => {
    let isMounted = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (!isMounted) return;
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("Live");
      } catch (error) {
        if (!isMounted) return;
        setStatus("Access blocked");
      }
    };

    startCamera();

    return () => {
      isMounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Load photos from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem("camera_photos");
    if (saved) {
      try {
        setPhotos(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Capture photo on canvas
  const capturePhoto = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    // Mirror image for front facing feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg");

    setFlash(true);
    setTimeout(() => setFlash(false), 150);

    const newPhoto: Photo = {
      id: Date.now().toString(),
      dataUrl,
      timestamp: Date.now(),
    };

    setPhotos((prev) => {
      const updated = [newPhoto, ...prev];
      localStorage.setItem("camera_photos", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deletePhoto = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("camera_photos", JSON.stringify(updated));
      return updated;
    });
    if (selectedPhoto?.id === id) setSelectedPhoto(null);
  };

  const downloadPhoto = (photo: Photo, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const link = document.createElement("a");
    link.href = photo.dataUrl;
    link.download = `photo_${photo.timestamp}.jpg`;
    link.click();
  };

  return (
    <div
      className={`w-full h-full flex flex-col relative select-none ${
        isDark ? "bg-black text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Flash overlay */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <canvas ref={canvasRef} className="hidden" />

      {/* Toolbar */}
      <div
        className={`h-12 flex items-center justify-between px-4 border-b ${
          isDark ? "border-white/10 bg-[#1e1e1e]" : "border-black/10 bg-white"
        }`}
      >
        <div className="flex items-center gap-2">
          <CameraIcon className="w-4 h-4 text-blue-500" />
          <span className="text-sm font-semibold">Camera</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-500 font-bold ml-2">
            {status}
          </span>
        </div>
        {photos.length > 0 && (
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border-none cursor-pointer text-blue-500 bg-transparent hover:bg-blue-500/10 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            {showGallery ? "Camera Feed" : `Gallery (${photos.length})`}
          </button>
        )}
      </div>

      {showGallery ? (
        /* ================= PHOTO GALLERY ================= */
        <div className="flex-1 p-4 grid grid-cols-3 gap-3 overflow-y-auto">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow"
            >
              <img src={photo.dataUrl} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity">
                <button
                  onClick={(e) => downloadPhoto(photo, e)}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/45 text-white border-none cursor-pointer transition"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => deletePhoto(photo.id, e)}
                  className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/45 text-red-400 border-none cursor-pointer transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ================= CAMERA PREVIEW ================= */
        <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }} // Mirror effect
          />

          {/* Shutter Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
            <button
              onClick={capturePhoto}
              disabled={status !== "Live"}
              className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-transparent"
            >
              <div className="w-12 h-12 rounded-full bg-white active:scale-95 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* ================= DETAILED PICTURE MODAL ================= */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/25 border-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedPhoto.dataUrl}
              className="max-h-[80vh] rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
