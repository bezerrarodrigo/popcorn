import {Movie} from './Movie';

export const MovieList = ({movies}) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie}/>
      ))}
    </ul>
  );
};

