import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../css/movieDetails.css'
const MovieDetails = () => {
  const imdbID = useParams();
  console.log(imdbID.id); 
  const [movieDetails, setMovieDetails] = useState({});
  useEffect(() => { 
    axios
      .get(`http://www.omdbapi.com/?i=${imdbID.id}&apikey=f8e77284&plot=full`)
      .then((response) => {
        if (response.data.Error) {
          throw new Error("Invalid Movie Name");
        } else {
          setMovieDetails(response.data);
          console.log(response.data);
        }

      })
      .catch((error) => {
        alert('Please Try Again'+ error.message)
      });
  }, [imdbID.id]);
  return (
    <div>
{/*       <h1 className="mainHead">MovieDetails</h1> */}
      <h2 className="title">{movieDetails.Title}</h2>
      <div className="imgContainer">
      <img
        src={
          movieDetails.Poster !== "N/A"
            ? movieDetails.Poster
            : "https://via.placeholder.com/400"
        }
        alt={movieDetails.Title}
        className="detailsPoster"
      />
      </div>
      <div className="subtypes">
      <p className="type">{movieDetails.Type}</p>
      <p className="rated">{movieDetails.Rated}</p>
      </div>
      <div className="main-container">


      <p className="plot">{movieDetails.Plot}</p>
      <p className="released">Release Date : {movieDetails.Released}</p>
      <p className="runtime">Runtime : {movieDetails.Runtime}</p>
      <p className="language">Languages : {movieDetails.Language}</p>
      <p className="director">Director : {movieDetails.Director}</p>
      <p className="actors">Cast : {movieDetails.Actors}</p>

      <div className="ratingSitesImg">
        <img src="/Assets/imdb.png" alt="no" />
        <img src="/Assets/rt.jpg" alt="no" />
        <img src="/Assets/metacritic.png" alt="no" />
      </div>
      {movieDetails.Ratings && movieDetails.Ratings.length > 0 ? (
        <div className="outer-ratingSites">{movieDetails.Ratings.map((rating,index) => {
            return(
                <div key={index} className="ratingSites">

                    <p className="value">{rating.Value}</p>
                </div>
            )
        })}</div>
      ) : (
        <div>None</div>
      )}


      </div>
    </div>
  );
};

export default MovieDetails
