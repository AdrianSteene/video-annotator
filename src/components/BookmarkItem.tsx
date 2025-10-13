import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { BookmarkType } from "@/types/bookmark";
import { useVideo } from "@/contexts/VideoContext";

interface BookmarkItemProps {
  bookmark: BookmarkType;
}

export function BookmarkItem({ bookmark }: BookmarkItemProps) {
  const {
    editingBookmark,
    seekTo,
    deleteBookmark,
    updateBookmarkComment,
    setEditingBookmark,
    formatTime,
  } = useVideo();

  const isEditing = editingBookmark === bookmark.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border rounded-lg p-3 space-y-2 hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <button
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => seekTo(bookmark.timestamp)}
        >
          {formatTime(bookmark.timestamp)}
        </button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => deleteBookmark(bookmark.id)}
        >
          Delete
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Input
            placeholder="Add a comment..."
            value={bookmark.comment}
            onChange={(e) => updateBookmarkComment(bookmark.id, e.target.value)}
            onBlur={() => setEditingBookmark(null)}
            autoFocus
          />
        </div>
      ) : (
        <div
          className="text-sm text-muted-foreground cursor-pointer"
          onClick={() => setEditingBookmark(bookmark.id)}
        >
          {bookmark.comment || "Click to add a comment..."}
        </div>
      )}
    </motion.div>
  );
}
