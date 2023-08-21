import {WatchedMovie} from './WatchedMovie';

export const WatchedMovieList = ({watched}) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie}/>
      ))}
    </ul>
  );
};

