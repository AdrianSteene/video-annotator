import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight">
              YouTube Annotator
            </h1>
            <p className="text-xl text-muted-foreground">
              Annotate YouTube videos with notes at specific timestamps that
              only you can see
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/annotate")}>
              <Play className="w-4 h-4" />
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>

          <div className="mt-16 p-8 border rounded-lg bg-card">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <h3 className="font-medium">Timestamp Notes</h3>
                <p className="text-sm text-muted-foreground">
                  Add notes at any point in the video
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Personal Library</h3>
                <p className="text-sm text-muted-foreground">
                  Your annotations are saved and private
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">Easy Access</h3>
                <p className="text-sm text-muted-foreground">
                  Simply paste any YouTube video URL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
