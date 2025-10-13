import ReactPlayer from "react-player";
import { VideoControls } from "@/components/VideoControls";
import { useVideo } from "@/contexts/VideoContext";

export function VideoPlayer() {
  const {
    playerRef,
    loadedUrl,
    isPlaying,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useVideo();

  return (
    <div className="bg-card rounded-lg overflow-hidden border">
      <div className="aspect-video bg-black relative">
        <ReactPlayer
          ref={playerRef}
          src={loadedUrl}
          playing={isPlaying}
          controls={false}
          style={{ width: "100%", height: "100%" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>

      <VideoControls />
    </div>
  );
}
