import {useEffect} from "react";

export const useKey = (key, action) => {
  useEffect(() => {

    function callback(evt) {
      if(evt.key.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }

    document.addEventListener('keydown', callback);

    return () => {
      document.removeEventListener('keydown', callback);
    };

  }, [action, key]);
};