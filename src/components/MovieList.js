import {Movie} from './Movie';

export const MovieList = ({movies, onSelectedMovie}) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie}
               onMovieSelected={onSelectedMovie}
        />
      ))}
    </ul>
  );
};

