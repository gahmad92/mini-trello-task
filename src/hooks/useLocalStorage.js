import { useState, useEffect } from 'react';

/**
 * @param {string} key - The name under which the data is saved in LocalStorage
 * @param {any} initialValue - The default value if nothing is found in storage
 */
export const useLocalStorage = (key, initialValue) => {
  // 1. Initialize state with a "Lazy Initializer" function
  // This only runs once on the very first render
  const [value, setValue] = useState(() => {
    try {
      const jsonValue = window.localStorage.getItem(key);
      
      // If data exists in LocalStorage, parse it and return it
      if (jsonValue !== null) return JSON.parse(jsonValue);
      
      // If it's the first time the user visits, use the initialValue
      // If initialValue is a function, call it; otherwise, just return it
      if (typeof initialValue === 'function') {
        return initialValue();
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error("LocalStorage Error: ", error);
      return initialValue;
    }
  });

  // 2. Use useEffect to update LocalStorage whenever the 'value' or 'key' changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage Save Error: ", error);
    }
  }, [key, value]);

  return [value, setValue];
};