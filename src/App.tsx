import { Route, Routes } from "react-router-dom";
import "./App.css";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { WithTransition } from "./components/WithTransition";
import { Portfolio } from "./pages/Portfolio";
import { Contact } from "./pages/Contact";
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
      <Routes>
        <Route
          key="hero"
          path="/"
          element={<WithTransition key="1" Component={Home} />}
        />
        <Route
          key="about"
          path="/about"
          element={<WithTransition key="2" Component={About} />}
        />
        <Route
          key="portfolio"
          path="/portfolio"
          element={<WithTransition key="3" Component={Portfolio} />}
        />
        <Route
          key="contact"
          path="/contact"
          element={<WithTransition key="4" Component={Contact} />}
        />
      </Routes>

    </div>
  );
}

export default App;
