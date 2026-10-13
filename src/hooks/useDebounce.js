import { useState, useEffect } from 'react';

/**
 * useDebounce hook
 * Delays updating the debounced value until after delayMs has elapsed
 * since the last time the value changed.
 */
export function useDebounce(value, delayMs = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delayMs]);

  return debouncedValue;
}
