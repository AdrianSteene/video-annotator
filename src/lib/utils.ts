import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchVideoMetadata(url: string): Promise<{
  title: string;
  thumbnail: string;
}> {
  try {
    const response = await fetch(
      `https://noembed.com/embed?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    return {
      title: data.title || url,
      thumbnail: data.thumbnail_url || "",
    };
  } catch (error) {
    console.error("Failed to fetch video metadata:", error);
    return {
      title: url,
      thumbnail: "",
    };
  }
}
