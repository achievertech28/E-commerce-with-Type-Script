import HeroSection from "./components/HeroSection";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Brands from "./components/Brands";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route
          index
          element={
            <>
              <HeroSection />
              <Brands />
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
