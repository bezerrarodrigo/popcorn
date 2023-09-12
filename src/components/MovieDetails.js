import {useEffect, useRef, useState} from "react";
import StarRating from "./StarRating";
import {Loader} from "./Loader";
import {useKey} from "../hooks/useKey";

export const MovieDetails = ({
                               selectedId,
                               onCloseSelectedMovie,
                               onAddWatchedMovie,
                               watchedMovies,
                             }) => {

  //states
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const countRef = useRef(0);
  
  useKey('Escape', onCloseSelectedMovie);

  //functions
  function handleAddWatchedMovie() {

    const newWatchedMovie = {
      imdbID: selectedId,
      poster,
      title,
      Year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
      userRatingsDecisions: countRef,
    };
    onAddWatchedMovie(newWatchedMovie);
    onCloseSelectedMovie();
  }


  //derived states
  const isWatched = watchedMovies.map(movie => movie.imdbID).includes(selectedId);
  const watchedMovieUserRating = watchedMovies.find(movie => {
    return movie.imdbID === selectedId;
  })?.userRating;


  const {
    imdbRating,
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year,
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
      setIsLoading(false);
    }

  }, [selectedId]);

  useEffect(() => {
    if(!title) return;
    document.title = `Movie: ${title}`;

    // clean up
    return () => {
      document.title = 'usePopcorn';
    };

  }, [title]);

  useEffect(() => {

    if(userRating) {
      countRef.current++;
    }

  }, [userRating]);


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
              {!isWatched ? <><StarRating maxRating={10} size={24} onSetRating={setUserRating}/>
                  {userRating > 0 &&
                    <button className="btn-add" onClick={handleAddWatchedMovie}>+ Add to
                      watched
                      list
                    </button>}</> :
                <p>You have already rated {watchedMovieUserRating} ⭐ for this movie.</p>}
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