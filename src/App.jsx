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

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { gradientColor } = useSelector((state) => state.design);

  useEffect(() => {
    switch (location.pathname) {
      case "/": {
        dispatch(setGradient("3131b199"));
        break;
      }
      case "/search": {
        dispatch(setGradient("bb203b99"));
        break;
      }
      case "/library": {
        dispatch(setGradient("3a883299"));
      }
    }
  }, [location.pathname]);

  return (
    <div className="h-screen">
      <div className="flex sm:gap-2 relative h-[calc(100%-88px)] sm:h-full">
        <section className="hidden sm:block sm:w-1/3 lg:w-1/4 h-full pl-2 py-2">
          <SideBar />
        </section>
        <section className="w-full sm:w-2/3 lg:w-3/4 flex-grow sm:py-2 sm:pr-2 h-full overflow-hidden">
          <div
            className={`h-full w-full  sm:rounded-lg bg_primary`}
            style={{
              backgroundImage: `linear-gradient(0deg, #121212 35%, ${gradientColor}  100%)`,
              backgroundPosition: "top",
            }}
          >
            <Profile gradientColor={gradientColor} />
            <div
              id="routeContainer"
              className="h-[calc(100%-80px)] px-4  overflow-y-scroll"
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<Search />} />
                <Route path="/library" element={<Library />} />
                <Route path="/artists/:artistId" element={<Artists />} />
                <Route path="/track/:trackId" element={<Track />} />
              </Routes>
            </div>
          </div>
        </section>
        <Player />
      </div>
      <MobileNav />
    </div>
  );
}

export default App;
