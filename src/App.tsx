import Main from "./pages/Main";
import { Routes, Route } from "react-router-dom";
import Movie from "./pages/Movie";
import { useAppDispatch } from "./redux/store";
import { useEffect } from "react";
import { fetchGenresList } from "./redux/genres/genresSlice";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesExplore from "./pages/MoviesExplore";
import TVExplore from "./pages/TVExplore";
import Details from "./pages/Details";
import AutoScroll from "./components/AutoScroll";
import Search from "./pages/Search";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenresList());
  }, []);

  return (
    <>
      <Header />
      <AutoScroll>
        <Routes>
          <Route element={<Main />} index />
          <Route element={<MoviesExplore />} path="explore/movie" />
          <Route element={<TVExplore />} path="explore/tv" />
          <Route element={<Details />} path="explore/:mediaType/:id" />
          <Route element={<Search />} path="search/:query" />
          <Route element={<Movie />} path="/movie/:id" />
        </Routes>
      </AutoScroll>
      <Footer />
    </>
  );
}

export default App;
