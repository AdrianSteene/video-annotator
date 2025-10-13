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
              Video Annotator
            </h1>
            <p className="text-xl text-muted-foreground">
              Annotate Video videos with notes at specific timestamps that only
              you can see
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate("/annotate")}>
              <Play className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
