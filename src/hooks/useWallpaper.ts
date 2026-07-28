import { useState, useEffect, useCallback } from "react";

export interface WallpaperOption {
  id: string;
  name: string;
  thumbnail: string;
  url: string;
  category: "default" | "nature" | "abstract" | "solid";
  deviceType: "mobile" | "tablet" | "desktop" | "all";
}

const DEFAULT_WALLPAPERS: WallpaperOption[] = [
  // Default Wallpaper for All
  {
    id: "mainwallpaper",
    name: "macOS Default (mainwallpaper.jpg)",
    thumbnail: "/mainwallpaper.jpg",
    url: "/mainwallpaper.jpg",
    category: "default",
    deviceType: "all",
  },
  {
    id: "macbook-m3",
    name: "macOS Sonoma Dark",
    thumbnail: "/macbook-m3.jpg",
    url: "/macbook-m3.jpg",
    category: "default",
    deviceType: "all",
  },
  {
    id: "macbook4",
    name: "Teal Wave Sonoma",
    thumbnail: "/macbook4.jpg",
    url: "/macbook4.jpg",
    category: "abstract",
    deviceType: "all",
  },
  {
    id: "wallpaper-sunset",
    name: "Warm Sunset",
    thumbnail: "/wallpaper.jpg",
    url: "/wallpaper.jpg",
    category: "nature",
    deviceType: "all",
  },
  {
    id: "solid-dark",
    name: "Dark Obsidian",
    thumbnail: "/mainwallpaper.jpg",
    url: "/mainwallpaper.jpg",
    category: "solid",
    deviceType: "all",
  },
  {
    id: "solid-blue",
    name: "Deep Ocean Blue",
    thumbnail: "/mainwallpaper.jpg",
    url: "/mainwallpaper.jpg",
    category: "solid",
    deviceType: "all",
  },
];

const SOLID_COLORS: Record<string, string> = {
  "solid-dark": "#0a0a0a",
  "solid-blue": "#0a1628",
};

export type DeviceType = "mobile" | "tablet" | "desktop";

export function useWallpaper() {
  const [wallpapers] = useState<WallpaperOption[]>(DEFAULT_WALLPAPERS);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(() => {
    return localStorage.getItem("selected-wallpaper") || "mainwallpaper";
  });
  const [customWallpapers, setCustomWallpapers] = useState<WallpaperOption[]>(
    () => {
      const saved = localStorage.getItem("custom-wallpapers");
      return saved ? JSON.parse(saved) : [];
    },
  );

  useEffect(() => {
    const detectDeviceType = (): DeviceType => {
      const width = window.innerWidth;
      if (width < 768) return "mobile";
      if (width < 1024) return "tablet";
      return "desktop";
    };

    const updateDeviceType = () => {
      setDeviceType(detectDeviceType());
    };

    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  useEffect(() => {
    localStorage.setItem("selected-wallpaper", selectedWallpaper);
  }, [selectedWallpaper]);

  useEffect(() => {
    localStorage.setItem("custom-wallpapers", JSON.stringify(customWallpapers));
  }, [customWallpapers]);

  const allWallpapers = [...wallpapers, ...customWallpapers];

  const getFilteredWallpapers = useCallback(() => {
    return allWallpapers;
  }, [allWallpapers]);

  const getBackgroundStyle = useCallback(
    (): React.CSSProperties => {
      const wp = DEFAULT_WALLPAPERS.concat(customWallpapers).find((w) => w.id === selectedWallpaper);

      if (!wp) {
        return {
          backgroundImage: `url('/mainwallpaper.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      }

      if (wp.category === "solid") {
        return {
          backgroundColor: SOLID_COLORS[wp.id] || "#0a0a0a",
          backgroundImage: "none",
        };
      }

      return {
        backgroundImage: `url('${wp.url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      };
    },
    [selectedWallpaper, customWallpapers]
  );

  const addCustomWallpaper = useCallback(
    (name: string, url: string) => {
      const id = `custom-${Date.now()}`;
      const newWp: WallpaperOption = {
        id,
        name,
        thumbnail: url,
        url,
        category: "nature",
        deviceType: deviceType,
      };
      setCustomWallpapers((prev) => [...prev, newWp]);
      setSelectedWallpaper(id);
    },
    [deviceType]
  );

  return {
    wallpapers: getFilteredWallpapers(),
    allWallpapers,
    selectedWallpaper,
    setSelectedWallpaper,
    getBackgroundStyle,
    addCustomWallpaper,
    solidColors: SOLID_COLORS,
    deviceType,
  };
}
