import {useEffect, useState} from "react";

const KEY = 'cc5bf4c3';

export const useMovies = (query, callback) => {

  //states
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


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
        if(err.name === 'AbortError') {
          setError(err.message);
          console.log(err.message);
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

    callback?.();
    fetchMovies();

    //clean up
    return () => {
      controller.abort();
    };

  }, [query]);

  return {isLoading, error, movies};

};