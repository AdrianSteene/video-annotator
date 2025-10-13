import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useVideo } from "@/contexts/VideoContext";
import { Gauge } from "lucide-react";

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

export function PlaybackSpeedControl() {
  const { playbackRate, setPlaybackRate, playerRef } = useVideo();

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (playerRef.current) {
      playerRef.current.playbackRate = speed;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" title="Playback speed">
          <Gauge className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {PLAYBACK_SPEEDS.map((speed) => (
          <DropdownMenuItem
            key={speed}
            onClick={() => handleSpeedChange(speed)}
            className={playbackRate === speed ? "bg-accent" : ""}
          >
            {speed}x {playbackRate === speed && "✓"}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

