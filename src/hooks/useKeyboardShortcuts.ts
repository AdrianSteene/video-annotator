import { useEffect } from "react";

export function useKeyboardShortcuts(
  enabled: boolean,
  onAddBookmark: () => void
) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputField =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (e.key === "n" && enabled && !isInputField) {
        e.preventDefault();
        onAddBookmark();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [enabled, onAddBookmark]);
}
