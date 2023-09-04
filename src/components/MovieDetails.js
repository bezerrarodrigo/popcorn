import {useEffect, useState} from "react";
import StarRating from "./StarRating";
import {Loader} from "./Loader";

export const MovieDetails = ({selectedId, onCloseSelectedMovie}) => {

  //states
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //variables
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {

    try {

      async function getMovieDetails() {
        setIsLoading(true);
        const response = await fetch(`https://www.omdbapi.com/?apikey=cc5bf4c3&i=${selectedId}`);
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);

      }

      getMovieDetails(selectedId);

    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
    }

  }, [selectedId]);


  return (

    <div className="details">

      {isLoading ? <Loader/> :
        <>
          <header>
            <button onClick={onCloseSelectedMovie} className="btn-back">&larr;</button>
            <img src={poster} alt={`Poster of ${title} movie`}/>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐</span>{imdbRating} IMDb Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              <StarRating maxRating={10} size={24} onSetRating={() => console.log('Votado!')}/>
            </div>
            <p><em>{plot}</em></p>
            <p>Starring: {actors}.</p>
            <p>Directed by: {director}.</p>
          </section>
        </>
      }

    </div>
  );
};