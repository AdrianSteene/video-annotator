import ReactPlayer from "react-player";
import { VideoControls } from "@/components/VideoControls";
import { useVideo } from "@/contexts/VideoContext";

export function VideoPlayer() {
  const {
    playerRef,
    loadedUrl,
    isPlaying,
    togglePlayPause,
    handleTimeUpdate,
    handleLoadedMetadata,
  } = useVideo();

  return (
    <div className="bg-card rounded-lg overflow-hidden border">
      <div
        className="aspect-video bg-black relative cursor-pointer"
        onClick={togglePlayPause}
      >
        <ReactPlayer
          ref={playerRef}
          src={loadedUrl}
          playing={isPlaying}
          controls={false}
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          config={{
            youtube: {
              playerVars: {
                disablekb: 1,
              },
            },
          }}
        />
      </div>

      <VideoControls />
    </div>
  );
}
