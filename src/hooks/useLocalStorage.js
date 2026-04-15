import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem(key);
    
        return saved !== null ? saved : initialValue;
    });

   useEffect(() => {
        localStorage.setItem(key, state);
    }, [key, state]);

  return [state, setState];
}