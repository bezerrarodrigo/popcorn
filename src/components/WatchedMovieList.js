import {WatchedMovie} from './WatchedMovie';

export const WatchedMovieList = ({moviesWatched, onDelete}) => {
  return (
    <ul className="list">
      {moviesWatched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete}/>
      ))}
    </ul>
  );
};

