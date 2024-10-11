import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard'

const Api_URL = "http://www.omdbapi.com/?apikey=4e28fe6a";

const App = () => {

  const [movie,setMovie] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${Api_URL}&s=${title}`);
    const data = await response.json();
    setMovie(data.Search);
  };

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  return (
    <div className="app">
      <h1>MovieMuse</h1>

      <div className="search">
        <input
          placeholder="Search for movie"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img src={SearchIcon} alt="icon" onClick={() => searchMovies(searchTerm)} />
      </div>

    {
      movie.length > 0
      ? ( 
          <div className="container">
            {
              movie.map((movie)=>{
               return <MovieCard movie = {movie}/>
              })
            }
         </div>)
      : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )
    }

    </div>
  );
};

export default App;
