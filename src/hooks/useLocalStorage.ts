import { useState } from 'react';

// Custom Hook - עוטף useState עם localStorage
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  const clearValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setStoredValue, clearValue] as const;
}

export default useLocalStorage;
