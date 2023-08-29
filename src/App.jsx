import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setGradient } from "./redux/features/DesignSlice";
import SideBar from "./components/SideBar";
import MobileNav from "./components/MobileNav";
import Player from "./components/Player";
import Profile from "./components/Profile";
import HomePage from "./pages/HomePage";
import Search from "./pages/Search";
import Library from "./components/Library";
import Artists from "./pages/Artists";
import { useEffect } from "react";
import Track from "./pages/Track";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { gradientColor } = useSelector((state) => state.design);

  useEffect(() => {
    switch (location.pathname) {
      case "/": {
        dispatch(setGradient("3131b1"));
        break;
      }
      case "/search": {
        dispatch(setGradient("bb203b"));
        break;
      }
      case "/library": {
        dispatch(setGradient("3a8832"));
      }
    }
  }, [location.pathname]);

  console.log(gradientColor);

  return (
    <div
      className="h-screen overflow-hidden sm:px-2 sm:py-2"
      style={{ height: "100dvh" }}
    >
      <div className="flex sm:gap-2 relative overflow-hidden  h-[calc(100%-88px)] sm:h-full">
        <section className="h-full hidden sm:block sm:w-1/3 lg:w-1/4 rounded-md">
          <SideBar />
        </section>
        <section
          id="routeContainer"
          className="w-full sm:w-2/3 lg:w-3/4 flex-grow sm:rounded-md overflow-x-hidden overflow-y-scroll"
        >
          <div
            className="w-full sm:rounded-lg bg_primary"
            style={{
              backgroundImage: `linear-gradient(180deg,${gradientColor} 13%, #121212 50%, #121212  100%)`,
              backgroundPosition: "top",
            }}
          >
            <div className="h-[calc(100%-80px)] sm:rounded-xl">
              <Profile gradientColor={gradientColor} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/artists/:artistId" element={<Artists />} />
                <Route path="/track/:trackId" element={<Track />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </section>
        <Player />
      </div>
      <MobileNav />
    </div>
  );
}

export default App;
