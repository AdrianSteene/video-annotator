import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VideoProvider, useVideo } from "@/contexts/VideoContext";
import { VideoUrlInput } from "@/components/VideoUrlInput";
import { VideoPlayer } from "@/components/VideoPlayer";
import { BookmarkList } from "@/components/BookmarkList";

function VideoAnnotatorContent() {
  const navigate = useNavigate();
  const { loadedUrl, resetVideo } = useVideo();

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Video Annotator</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!loadedUrl ? (
          <VideoUrlInput />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <VideoPlayer />

              <div className="space-y-2">
                <Button variant="outline" onClick={resetVideo}>
                  Load Different Video
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <BookmarkList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VideoAnnotator() {
  return (
    <VideoProvider>
      <VideoAnnotatorContent />
    </VideoProvider>
  );
}
