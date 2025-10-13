import ReactPlayer from "react-player";
import { VideoControls } from "@/components/VideoControls";
import { useVideo } from "@/contexts/VideoContext";

export function VideoPlayer() {
  const {
    playerRef,
    loadedUrl,
    isPlaying,
    playbackRate,
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
          ref={playerRef as React.RefObject<HTMLVideoElement>}
          src={loadedUrl}
          playing={isPlaying}
          playbackRate={playbackRate}
          controls={false}
          style={{ width: "100%", height: "100%", pointerEvents: "none" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />
      </div>

      <VideoControls />
    </div>
  );
}
