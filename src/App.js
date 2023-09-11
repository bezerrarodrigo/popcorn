import {useEffect, useState} from 'react';
import {Navbar} from './components/Navbar';
import {Main} from './components/Main';
import {Search} from './components/Search';
import {NumResults} from './components/NumResults';
import {Box} from './components/Box';
import {Summary} from './components/Summary';
import {WatchedMovieList} from './components/WatchedMovieList';
import {Loader} from './components/Loader';
import {MovieList} from './components/MovieList';
import {ErrorMessage} from './components/ErrorMessage';
import {MovieDetails} from "./components/MovieDetails";
import {useMovies} from "./hooks/useMovies";

export default function App() {

  //states
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    return JSON.parse(localStorage.getItem('watchedMovies'));
  });
  const {isLoading, error, movies} = useMovies(query, handleCloseSelectedMovie);

  function handleSelectMovie(id) {
    setSelectedId(prevState => prevState === id ? null : id);
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  function handleAddWatchedMovie(movie) {
    setWatched(prevState => [...prevState, movie]);
  }

  function handleRemoveWatchedMovie(id) {
    setWatched(prevState => prevState.filter(movie => {
      return movie.imdbID !== id;
    }));
  }


  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watched));
  }, [watched]);

  return (
    <>
      <Navbar>
        <Search query={query} onQuery={setQuery} onCloseMovie={handleCloseSelectedMovie}/>
        <NumResults movies={movies}/>
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader/>}
          {!isLoading && !error &&
            <MovieList movies={movies}
                       onSelectedMovie={handleSelectMovie}
                       onCloseSelectedMovie={handleCloseSelectedMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectedId ? <MovieDetails selectedId={selectedId}
                                      watchedMovies={watched}
                                      onAddWatchedMovie={handleAddWatchedMovie}
                                      onCloseSelectedMovie={handleCloseSelectedMovie}/> :
            <>
              <Summary watched={watched}/>
              <WatchedMovieList moviesWatched={watched} onDelete={handleRemoveWatchedMovie}/>
            </>
          }
        </Box>
      </Main>
    </>
  );
}
