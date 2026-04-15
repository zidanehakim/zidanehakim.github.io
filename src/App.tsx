import "./App.css";
import { Navbar } from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";

function App() {
  // On refresh go to top of the web page
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <ScrollToTop />
      <Navbar />
    </div>
  );
}

export default App;
