import { useEffect } from "react";
import { BookmarkType, VideoData } from "@/types/bookmark";

export function useVideoStorage(
  url: string | null,
  bookmarks: BookmarkType[],
  setBookmarks: (bookmarks: BookmarkType[]) => void
) {
  useEffect(() => {
    if (url) {
      const stored = localStorage.getItem(`video_${url}`);
      if (stored) {
        const data: VideoData = JSON.parse(stored);
        setBookmarks(data.bookmarks);
      }
    }
  }, [url, setBookmarks]);

  useEffect(() => {
    if (url && bookmarks.length >= 0) {
      const data: VideoData = {
        url: url,
        bookmarks: bookmarks,
      };
      localStorage.setItem(`video_${url}`, JSON.stringify(data));
    }
  }, [bookmarks, url]);
}
