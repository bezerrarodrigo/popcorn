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

const KEY = 'cc5bf4c3';

export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState("star");
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {

    const controller = new AbortController();

    async function fetchMovies() {

      try {

        setIsLoading(true);
        setError(''); //very important
        const response = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {signal: controller.signal})
          .catch(() => {
            throw new Error(`Something went wrong with movies fetch!`) ;
          });

        const data = await response.json();
        if(data.Response === 'False') throw new Error('Movie not found!');
        setMovies(data.Search);
        setError('');

      } catch (err) {

        if(err.name !== 'AbortError') {
          setError(err.message);
        }
        
      } finally {
        setIsLoading(false);
      }

    }

    if(query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();

    //clean up
    return function () {
      controller.abort();
    };

  }, [query]);


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


  return (
    <>
      <Navbar>
        <Search query={query} onQuery={setQuery}/>
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
