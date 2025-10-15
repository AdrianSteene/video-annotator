import { useVideo } from "@/contexts/VideoContext";
import { useRef, useState, useEffect, useCallback } from "react";

export function Timeline() {
  const { currentTime, duration, bookmarks, seekTo, formatTime } = useVideo();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewTime, setPreviewTime] = useState<number | null>(null);

  const displayTime = previewTime ?? currentTime;

  const handleSeek = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const time = percentage * duration;
      setPreviewTime(time);
      seekTo(time);
    },
    [duration, seekTo]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleSeek(e);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleSeek(e);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setPreviewTime(null);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, duration, seekTo, handleSeek]);

  return (
    <div className="flex-1 flex items-center gap-2">
      <span className="text-sm tabular-nums">{formatTime(displayTime)}</span>
      <div
        ref={timelineRef}
        className="flex-1 h-2 bg-secondary rounded-full cursor-pointer relative group select-none"
        onMouseDown={handleMouseDown}
      >
        <div
          className="h-full bg-primary rounded-full"
          style={{
            width: `${duration ? (displayTime / duration) * 100 : 0}%`,
          }}
        />
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="absolute top-0 w-1 h-full bg-yellow-500 hover:bg-yellow-400 cursor-pointer"
            style={{
              left: `${(bookmark.timestamp / duration) * 100}%`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              seekTo(bookmark.timestamp);
            }}
            title={formatTime(bookmark.timestamp)}
          />
        ))}
      </div>
      <span className="text-sm tabular-nums text-muted-foreground">
        {formatTime(duration)}
      </span>
    </div>
  );
}
