import { Container } from "react-bootstrap";
import "./App.css";
import NavBar from "../src/components/NavBar";
import MovieList from "./components/MovieList";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getAllMovies = async () => {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/popular?api_key=5c195a56db556278b48f1b1eab0b2c30&language=ar&page=1"
    );
    setMovies(res.data.results);
    setPageCount(res.data.total_pages);
  };
  useEffect(() => {
    getAllMovies();
  }, []);

  const searchQuery = async (word) => {
    if (word === "") {
      getAllMovies();
    } else {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=5c195a56db556278b48f1b1eab0b2c30&query=${word}&language=ar&page=1`
      );
      setMovies(res.data.results);
      setPageCount(res.data.total_pages);
    }
  };
  const getPage = async (number) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=5c195a56db556278b48f1b1eab0b2c30&language=ar&page=${number}`
    );
    setMovies(res.data.results);
    console.log(res.data.total_pages);
  };
  return (
    <div className="font color-body">
      <NavBar searchQuery={searchQuery} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <MovieList
                  movies={movies}
                  getPage={getPage}
                  pageCount={pageCount}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetails />}/>
          </Routes>

        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
