import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import VideoAnnotator from "./pages/VideoAnnotator";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/annotate" element={<VideoAnnotator />} />
      </Routes>
    </Router>
  );
}

export default App;
