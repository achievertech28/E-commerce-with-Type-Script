import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Brands from "./components/Brands";

function Layout() {
  return (
    <>
      <Navbar />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
