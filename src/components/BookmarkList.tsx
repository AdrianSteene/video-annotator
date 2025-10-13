import { BookmarkItem } from "@/components/BookmarkItem";
import { useVideo } from "@/contexts/VideoContext";

export function BookmarkList() {
  const { bookmarks } = useVideo();

  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-lg font-semibold mb-4">
        Bookmarks ({bookmarks.length})
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Press <kbd className="px-2 py-1 bg-secondary rounded text-xs">N</kbd> to
        add a bookmark
      </p>

      <div className="space-y-2">
        {bookmarks.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No bookmarks yet. Add one to get started!
          </p>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkItem key={bookmark.id} bookmark={bookmark} />
          ))
        )}
      </div>
    </div>
  );
}
