import {useEffect, useRef} from "react";

export const Search = ({query, onQuery}) => {

  const inputSearchEl = useRef(null);

  //effects
  useEffect(() => {

    inputSearchEl.current.focus();

    function callback(e) {

      if(document.activeElement === inputSearchEl.current) return;

      if(e.code === 'Enter') {
        inputSearchEl.current.focus();
        onQuery('');
      }
    }

    document.addEventListener('keydown', callback);

    //clear
    return () => document.addEventListener('keydown', callback);


  }, [onQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => onQuery(e.target.value)}
      ref={inputSearchEl}
    />
  );
};

