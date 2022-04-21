import { Route, Routes } from "react-router-dom";
import Detail from "./components/Detail/Detail";
import Favorites from "./components/Favorites/Favorites";
import Home from "./components/Home/Home";
import Movies from "./components/Movies/Movies";
import Sidebar from "./components/Sidebar";
import TVShow from "./components/TVShows/TVShows";
import Watch from "./components/Watch/Watch";

function App() {
  return (
    <div className="main">
      <Sidebar />

      <Routes>
        {/* <Route path="/watch/:id" element={<Watch />} /> */}
        <Route path="/movie" element={<Movies />} />
        <Route path="/movie/watch/:id" element={<Watch />} />
        <Route path="/movie/detail/:id" element={<Detail />} />
        <Route path="/tv" element={<TVShow />} />
        <Route path="/tv/watch/:id" element={<Watch />} />
        <Route path="/tv/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
