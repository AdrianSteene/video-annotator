import { useEffect } from "react";

export function useKeyboardShortcuts(
  enabled: boolean,
  onAddBookmark: () => void,
  onTogglePlayPause: () => void,
  onSkipBackward: () => void,
  onSkipForward: () => void
) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (!enabled) return;

      if (isInputField) return;

      switch (e.key) {
        case "n":
          e.preventDefault();
          onAddBookmark();
          break;
        case " ":
          e.preventDefault();
          onTogglePlayPause();
          break;
        case "ArrowLeft":
          e.preventDefault();
          onSkipBackward();
          break;
        case "ArrowRight":
          e.preventDefault();
          onSkipForward();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enabled, onAddBookmark, onTogglePlayPause, onSkipBackward, onSkipForward]);
}
