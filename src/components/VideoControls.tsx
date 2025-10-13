import { Button } from "@/components/ui/button";
import { Play, Pause, Bookmark } from "lucide-react";
import { Timeline } from "@/components/Timeline";
import { useVideo } from "@/contexts/VideoContext";

export function VideoControls() {
  const { isPlaying, togglePlayPause, addBookmark } = useVideo();

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <Button size="icon" variant="outline" onClick={togglePlayPause}>
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          size="icon"
          variant="outline"
          onClick={addBookmark}
          title="Add bookmark (N)"
        >
          <Bookmark className="w-4 h-4" />
        </Button>

        <Timeline />
      </div>
    </div>
  );
}
