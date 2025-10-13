import { useVideo } from "@/contexts/VideoContext";

export function Timeline() {
  const { currentTime, duration, bookmarks, seekTo, formatTime } = useVideo();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const time = percentage * duration;
    seekTo(time);
  };

  return (
    <div className="flex-1 flex items-center gap-2">
      <span className="text-sm tabular-nums">{formatTime(currentTime)}</span>
      <div
        className="flex-1 h-2 bg-secondary rounded-full cursor-pointer relative group"
        onClick={handleClick}
      >
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{
            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
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
