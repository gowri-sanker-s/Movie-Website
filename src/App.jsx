import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const handleSearchMovie = (e) => {
    console.log("functionCalled");
    e.preventDefault();
    axios
      .get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=f8e77284&s=${searchMovie}`
      )
      .then((response) => {
        if (response.data.Error) {
          setSearchMovie('')

          throw new Error("Invalid Movie Name");

        } else {
          setMovies(response.data.Search);
          console.log(response.data.Search);
          }

      })
      .catch((error) =>{
        alert(error.message  + ", Please re-enter Movie Name")
      })
  };
  const movieDetails = (imdbID) => {
    navigate(`/movieDetails/${imdbID}`);
    console.log(imdbID);
  };
  return (
    <div className="App">
      <h1 className="mainHeading">CMOVIE</h1>
      <form
        onSubmit={handleSearchMovie}
        className={`form ${movies.length > 0 ? "formMovie" : "formNoMovie"}`}
      >
        <input
          type="text"
          placeholder="Search Movies"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        </button>
      </form>
      <h3 className={`${!movies.length > 0 ? 'showDiscovery' : 'hideDiscovery'}`}>
        Discover and Explore: Your Cinematic Journey Begins Here!
      </h3>
      {!movies.length > 0 ? (
        <div className="noMovies"></div>
      ) : (
        <div className="moviePosters">
          {movies.map((movie, index) => {
            return (
              <div
                className="container"
                key={movie.imdbID}
                onClick={() => movieDetails(movie.imdbID)}
              >
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/400"
                  }
                  alt={movie.Title}
                  className="movieImage"
                />
                <p className="movieTitle">
                  {movie.Title} - {movie.Year}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
