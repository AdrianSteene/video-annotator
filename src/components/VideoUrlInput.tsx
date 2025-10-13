import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVideo } from "@/contexts/VideoContext";
import { SavedVideosList } from "@/components/SavedVideosList";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircleIcon, FileVideo } from "lucide-react";
import { fetchVideoMetadata } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface VideoPreview {
  title: string;
  thumbnail: string;
}

export function VideoUrlInput() {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<VideoPreview | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const { setLoadedUrl } = useVideo();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (!videoUrl.trim()) {
        setPreview(null);
        setError(null);
        return;
      }

      try {
        new URL(videoUrl);
        setError(null);
        setLoadingPreview(true);

        const metadata = await fetchVideoMetadata(videoUrl);
        setPreview(metadata);
        setLoadingPreview(false);
      } catch {
        setError(null);
        setPreview(null);
        setLoadingPreview(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [videoUrl]);

  const handleLoad = () => {
    try {
      new URL(videoUrl);
    } catch {
      setError("Please enter a valid video URL");
      return;
    }
    setLoadedUrl(videoUrl);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Paste a Video URL</h2>
        <p className="text-muted-foreground">
          Enter a Video, Vimeo, or other supported video URL to start annotating
        </p>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="https://www.youtube.com/watch?v=..."
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLoad()}
          className={`flex-1 ${
            error && "border-red-500 focus-visible:ring-red-500"
          }`}
        />
        <Button onClick={handleLoad}>Load Video</Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <span className="sr-only">{error}</span>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <AnimatePresence mode="wait">
        {loadingPreview && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center py-8"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </motion.div>
        )}
        {!loadingPreview && preview && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border rounded-lg overflow-hidden bg-card max-w-md"
          >
            <div className="relative aspect-video bg-muted">
              {preview.thumbnail ? (
                <img
                  src={preview.thumbnail}
                  alt={preview.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileVideo className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm line-clamp-2">
                {preview.title}
              </h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <SavedVideosList onSelectVideo={setLoadedUrl} />
    </div>
  );
}
