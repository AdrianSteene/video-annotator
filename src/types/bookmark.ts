export interface BookmarkType {
  id: string;
  timestamp: number;
  comment: string;
  createdAt: number;
}

export interface VideoData {
  url: string;
  bookmarks: BookmarkType[];
}
