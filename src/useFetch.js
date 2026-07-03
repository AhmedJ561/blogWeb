import { useState, useEffect } from 'react';
import { getBlogs } from './api';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setPending(true);

    getBlogs()
      .then((blogs) => {
        if (!cancelled) {
          setData(blogs);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Could not load blogs.');
      })
      .finally(() => {
        if (!cancelled) setPending(false);
      });

    return () => { cancelled = true; };
  }, []);

  return { data, isPending, error };
};

export default useFetch;