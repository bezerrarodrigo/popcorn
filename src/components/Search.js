import {useRef} from "react";
import {useKey} from "../hooks/useKey";

export const Search = ({query, onQuery, onCloseMovie}) => {

  const inputSearchEl = useRef(null);


  useKey('Enter', function () {
    if(document.activeElement === inputSearchEl.current) return;
    inputSearchEl.current.focus();
    onQuery('');

  });


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

