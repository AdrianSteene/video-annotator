import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { VideoData } from "@/types/bookmark";
import { Play, FileVideo, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchVideoMetadata } from "@/lib/utils";

interface VideoMetadata {
  url: string;
  title: string;
  thumbnail: string;
  bookmarkCount: number;
}

interface SavedVideosListProps {
  onSelectVideo: (url: string) => void;
}

export function SavedVideosList({ onSelectVideo }: SavedVideosListProps) {
  const [videos, setVideos] = useState<VideoMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSavedVideos();
  }, []);

  async function loadSavedVideos() {
    setLoading(true);
    const savedVideos: VideoMetadata[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("video_")) {
        const url = key.replace("video_", "");
        const stored = localStorage.getItem(key);
        if (stored) {
          const data: VideoData = JSON.parse(stored);
          const metadata = await fetchVideoMetadata(url);
          savedVideos.push({
            url,
            title: metadata.title,
            thumbnail: metadata.thumbnail,
            bookmarkCount: data.bookmarks.length,
          });
        }
      }
    }

    savedVideos.sort((a, b) => b.bookmarkCount - a.bookmarkCount);
    setVideos(savedVideos);
    setLoading(false);
  }

  function deleteVideo(url: string, e: React.MouseEvent) {
    e.stopPropagation();
    localStorage.removeItem(`video_${url}`);
    setVideos((prev) => prev.filter((v) => v.url !== url));
  }

  if (loading) {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Your Saved Videos</h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Your Saved Videos</h2>
        <div className="text-center py-8 text-muted-foreground">
          <FileVideo className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No saved videos yet</p>
          <p className="text-sm mt-1">
            Load a video and add bookmarks to get started
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Your Saved Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {videos.map((video, index) => (
            <motion.div
              key={video.url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-card"
            >
              <div className="relative aspect-video bg-muted">
                {video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center group">
                  <Button
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onSelectVideo(video.url)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {video.bookmarkCount}{" "}
                    {video.bookmarkCount === 1 ? "note" : "notes"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:text-destructive"
                    onClick={(e) => deleteVideo(video.url, e)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
