import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button size="lg" className="my-5" onClick={handleGoHome}>
        Go to Home
      </Button>
    </div>
  );
}

export default PageNotFound;
