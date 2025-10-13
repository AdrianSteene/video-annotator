import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useVideo } from "@/contexts/VideoContext";
import { SavedVideosList } from "@/components/SavedVideosList";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function VideoUrlInput() {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { setLoadedUrl } = useVideo();

  const handleLoad = () => {
    try {
      new URL(videoUrl);
    } catch {
      setError("Please enter a video URL");
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
      <SavedVideosList onSelectVideo={setLoadedUrl} />
      {error && (
        <Alert variant="destructive" className="content-center">
          <AlertCircleIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
