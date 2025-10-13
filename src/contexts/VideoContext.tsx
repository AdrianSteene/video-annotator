import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { BookmarkType } from "@/types/bookmark";
import { useVideoStorage } from "@/hooks/useVideoStorage";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { formatTime } from "@/utils/formatTime";

interface VideoContextType {
  playerRef: React.RefObject<HTMLVideoElement | null>;
  loadedUrl: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  bookmarks: BookmarkType[];
  editingBookmark: string | null;
  playbackRate: number;
  setLoadedUrl: (url: string) => void;
  setIsPlaying: (playing: boolean) => void;
  setEditingBookmark: (id: string | null) => void;
  setPlaybackRate: (rate: number) => void;
  togglePlayPause: () => void;
  seekTo: (time: number) => void;
  skipBackward: () => void;
  skipForward: () => void;
  addBookmark: () => void;
  updateBookmarkComment: (id: string, comment: string) => void;
  deleteBookmark: (id: string) => void;
  handleTimeUpdate: () => void;
  handleLoadedMetadata: () => void;
  formatTime: (seconds: number) => string;
  resetVideo: () => void;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export function VideoProvider({ children }: { children: ReactNode }) {
  const playerRef = useRef<HTMLVideoElement | null>(null);
  const [loadedUrl, setLoadedUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [editingBookmark, setEditingBookmark] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  useVideoStorage(loadedUrl || null, bookmarks, setBookmarks);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const addBookmark = useCallback(() => {
    const newBookmark: BookmarkType = {
      id: Date.now().toString(),
      timestamp: currentTime,
      comment: "",
      createdAt: Date.now(),
    };
    setBookmarks((prev) =>
      [...prev, newBookmark].sort((a, b) => a.timestamp - b.timestamp)
    );
    setEditingBookmark(newBookmark.id);
  }, [currentTime]);

  const skipBackward = useCallback(() => {
    if (playerRef.current) {
      const newTime = Math.max(0, playerRef.current.currentTime - 10);
      playerRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, []);

  const skipForward = useCallback(() => {
    if (playerRef.current) {
      const newTime = Math.min(duration, playerRef.current.currentTime + 10);
      playerRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  }, [duration]);

  useKeyboardShortcuts(
    !!loadedUrl,
    addBookmark,
    togglePlayPause,
    skipBackward,
    skipForward
  );

  const seekTo = useCallback((time: number) => {
    if (playerRef.current) {
      playerRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (playerRef.current) {
      setCurrentTime(playerRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (playerRef.current) {
      setDuration(playerRef.current.duration);
    }
  }, []);

  const updateBookmarkComment = useCallback((id: string, comment: string) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, comment } : b))
    );
  }, []);

  const deleteBookmark = useCallback((id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const resetVideo = useCallback(() => {
    setLoadedUrl("");
    setBookmarks([]);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setEditingBookmark(null);
    setPlaybackRate(1);
  }, []);

  const value: VideoContextType = {
    playerRef,
    loadedUrl,
    isPlaying,
    currentTime,
    duration,
    bookmarks,
    editingBookmark,
    playbackRate,
    setLoadedUrl,
    setIsPlaying,
    setEditingBookmark,
    setPlaybackRate,
    togglePlayPause,
    seekTo,
    skipBackward,
    skipForward,
    addBookmark,
    updateBookmarkComment,
    deleteBookmark,
    handleTimeUpdate,
    handleLoadedMetadata,
    formatTime,
    resetVideo,
  };

  return (
    <VideoContext.Provider value={value}>{children}</VideoContext.Provider>
  );
}

export function useVideo() {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error("useVideo must be used within a VideoProvider");
  }
  return context;
}
